import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/common/prisma/prisma.service';
import { CreateOrderDto, UpdateOrderStatusDto, AddOrderItemDto, UpdateOrderItemDto } from './dto/orders.dto';
import { OrderStatus } from '@prisma/client';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async createOrder(data: CreateOrderDto) {
    const { items, ...orderData } = data;

    // Fetch menu items to calculate prices
    const menuItems = await this.menuItem.findMany({
      where: {
        id: {
          in: items.map((item) => item.menuItemId),
        },
      },
    });

    // Calculate subtotal and tax
    let subtotal = 0;
    const orderItems = items.map((item) => {
      const menuItem = menuItems.find((mi) => mi.id === item.menuItemId);
      const itemSubtotal = (menuItem?.price || 0) * item.quantity;
      subtotal += itemSubtotal;
      return {
        menuItemId: item.menuItemId,
        quantity: item.quantity,
        price: menuItem?.price || 0,
      };
    });

    // Get tax rate
    const settings = await this.restaurantSettings.findUnique({
      where: { restaurantId: orderData.restaurantId },
    });

    const tax = (subtotal * (settings?.taxRate || 8)) / 100;
    const total = subtotal + tax;

    return this.order.create({
      data: {
        ...orderData,
        subtotal,
        tax,
        total,
        items: {
          createMany: {
            data: orderItems,
          },
        },
      },
      include: {
        items: { include: { menuItem: true } },
        table: true,
        staff: true,
      },
    });
  }

  async getOrders(restaurantId: string, status?: OrderStatus) {
    return this.order.findMany({
      where: {
        restaurantId,
        ...(status && { status }),
      },
      include: {
        items: { include: { menuItem: true } },
        table: true,
        staff: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getOrderById(id: string) {
    return this.order.findUnique({
      where: { id },
      include: {
        items: { include: { menuItem: true } },
        table: true,
        staff: true,
      },
    });
  }

  async updateOrderStatus(id: string, data: UpdateOrderStatusDto) {
    return this.order.update({
      where: { id },
      data,
      include: {
        items: { include: { menuItem: true } },
        table: true,
        staff: true,
      },
    });
  }

  async addOrderItem(orderId: string, data: AddOrderItemDto) {
    const menuItem = await this.menuItem.findUnique({
      where: { id: data.menuItemId },
    });

    const order = await this.order.findUnique({
      where: { id: orderId },
      include: { items: true },
    });

    // Add item to order
    await this.orderItem.create({
      data: {
        orderId,
        menuItemId: data.menuItemId,
        quantity: data.quantity,
        price: menuItem?.price || 0,
      },
    });

    // Recalculate order total
    const updatedOrder = await this.order.findUnique({
      where: { id: orderId },
      include: { items: true },
    });

    const newSubtotal = updatedOrder?.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    ) || 0;

    const settings = await this.restaurantSettings.findUnique({
      where: { restaurantId: order?.restaurantId || '' },
    });

    const newTax = (newSubtotal * (settings?.taxRate || 8)) / 100;
    const newTotal = newSubtotal + newTax;

    return this.order.update({
      where: { id: orderId },
      data: {
        subtotal: newSubtotal,
        tax: newTax,
        total: newTotal,
      },
      include: {
        items: { include: { menuItem: true } },
        table: true,
        staff: true,
      },
    });
  }

  async removeOrderItem(orderItemId: string) {
    const orderItem = await this.orderItem.findUnique({
      where: { id: orderItemId },
    });

    await this.orderItem.delete({
      where: { id: orderItemId },
    });

    // Recalculate order total
    const order = await this.order.findUnique({
      where: { id: orderItem?.orderId },
      include: { items: true },
    });

    const newSubtotal = order?.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    ) || 0;

    const settings = await this.restaurantSettings.findUnique({
      where: { restaurantId: order?.restaurantId || '' },
    });

    const newTax = (newSubtotal * (settings?.taxRate || 8)) / 100;
    const newTotal = newSubtotal + newTax;

    return this.order.update({
      where: { id: orderItem?.orderId },
      data: {
        subtotal: newSubtotal,
        tax: newTax,
        total: newTotal,
      },
      include: {
        items: { include: { menuItem: true } },
        table: true,
        staff: true,
      },
    });
  }

  async deleteOrder(id: string) {
    return this.order.delete({
      where: { id },
    });
  }

  async searchOrders(restaurantId: string, query: string) {
    return this.order.findMany({
      where: {
        restaurantId,
        OR: [
          { orderNumber: { contains: query, mode: 'insensitive' } },
          { table: { tableNumber: parseInt(query) || undefined } },
        ],
      },
      include: {
        items: { include: { menuItem: true } },
        table: true,
        staff: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getOrdersByTable(tableId: string) {
    return this.order.findMany({
      where: { tableId },
      include: {
        items: { include: { menuItem: true } },
        staff: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}
