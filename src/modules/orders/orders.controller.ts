import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import {
  CreateOrderDto,
  UpdateOrderStatusDto,
  AddOrderItemDto,
  UpdateOrderItemDto,
} from './dto/orders.dto';
import { OrderStatus } from '@prisma/client';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.createOrder(createOrderDto);
  }

  @Get()
  async getOrders(
    @Query('restaurantId') restaurantId: string,
    @Query('status') status?: OrderStatus,
  ) {
    return this.ordersService.getOrders(restaurantId, status);
  }

  @Get(':id')
  async getOrderById(@Param('id') id: string) {
    return this.ordersService.getOrderById(id);
  }

  @Put(':id/status')
  async updateOrderStatus(
    @Param('id') id: string,
    @Body() updateOrderStatusDto: UpdateOrderStatusDto,
  ) {
    return this.ordersService.updateOrderStatus(id, updateOrderStatusDto);
  }

  @Post(':id/items')
  async addOrderItem(
    @Param('id') id: string,
    @Body() addOrderItemDto: AddOrderItemDto,
  ) {
    return this.ordersService.addOrderItem(id, addOrderItemDto);
  }

  @Delete('items/:itemId')
  async removeOrderItem(@Param('itemId') itemId: string) {
    return this.ordersService.removeOrderItem(itemId);
  }

  @Delete(':id')
  async deleteOrder(@Param('id') id: string) {
    return this.ordersService.deleteOrder(id);
  }

  @Get('search/:query')
  async searchOrders(
    @Query('restaurantId') restaurantId: string,
    @Param('query') query: string,
  ) {
    return this.ordersService.searchOrders(restaurantId, query);
  }

  @Get('table/:tableId')
  async getOrdersByTable(@Param('tableId') tableId: string) {
    return this.ordersService.getOrdersByTable(tableId);
  }
}
