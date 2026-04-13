import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/common/prisma/prisma.service';
import { ReportFiltersDto } from './dto/reports.dto';

@Injectable()
export class ReportsService {
  constructor(private prisma: PrismaService) {}

  async getDashboardStats(restaurantId: string) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const totalOrders = await this.order.count({
      where: { restaurantId },
    });

    const todayRevenue = await this.order.aggregate({
      where: {
        restaurantId,
        createdAt: { gte: today },
      },
      _sum: { total: true },
    });

    const activeTables = await this.table.count({
      where: {
        restaurantId,
        status: 'OCCUPIED',
      },
    });

    const totalTables = await this.table.count({
      where: { restaurantId },
    });

    const onlineStaff = await this.staff.count({
      where: {
        restaurantId,
        status: 'ONLINE',
      },
    });

    return {
      totalOrders,
      revenueToday: todayRevenue._sum.total || 0,
      activeTables: `${activeTables}/${totalTables}`,
      onlineStaff,
      occupancyRate: totalTables > 0 ? (activeTables / totalTables) * 100 : 0,
    };
  }

  async getMonthlySalesData(restaurantId: string, filters?: ReportFiltersDto) {
    const startDate = filters?.startDate
      ? new Date(filters.startDate)
      : new Date(new Date().setMonth(new Date().getMonth() - 6));

    const endDate = filters?.endDate ? new Date(filters.endDate) : new Date();

    const orders = await this.order.findMany({
      where: {
        restaurantId,
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    const monthlyData: Record<string, number> = {};

    orders.forEach((order) => {
      const month = order.createdAt.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
      });
      monthlyData[month] = (monthlyData[month] || 0) + order.total;
    });

    return Object.entries(monthlyData).map(([month, revenue]) => ({
      month,
      revenue,
    }));
  }

  async getOrderTypeDistribution(restaurantId: string) {
    const orders = await this.order.findMany({
      where: { restaurantId },
    });

    const distribution = {
      DINE_IN: 0,
      TAKEAWAY: 0,
      ONLINE: 0,
    };

    orders.forEach((order) => {
      distribution[order.orderType]++;
    });

    return [
      {
        name: 'Dine-in',
        value: distribution.DINE_IN,
        percentage: (distribution.DINE_IN / orders.length) * 100,
      },
      {
        name: 'Takeaway',
        value: distribution.TAKEAWAY,
        percentage: (distribution.TAKEAWAY / orders.length) * 100,
      },
      {
        name: 'Online',
        value: distribution.ONLINE,
        percentage: (distribution.ONLINE / orders.length) * 100,
      },
    ];
  }

  async getTopSellingItems(restaurantId: string, limit: number = 5) {
    const items = await this.orderItem.groupBy({
      by: ['menuItemId'],
      where: {
        order: { restaurantId },
      },
      _sum: { quantity: true },
      _count: { id: true },
      orderBy: { _sum: { quantity: 'desc' } },
      take: limit,
    });

    const topItems = await Promise.all(
      items.map(async (item) => {
        const menuItem = await this.menuItem.findUnique({
          where: { id: item.menuItemId },
        });
        return {
          itemName: menuItem?.name,
          unitsSold: item._sum.quantity || 0,
          revenue: ((menuItem?.price || 0) * (item._sum.quantity || 0)).toFixed(2),
        };
      }),
    );

    return topItems;
  }

  async getRevenueStats(restaurantId: string, filters?: ReportFiltersDto) {
    const startDate = filters?.startDate
      ? new Date(filters.startDate)
      : new Date(new Date().setMonth(new Date().getMonth() - 1));

    const endDate = filters?.endDate ? new Date(filters.endDate) : new Date();

    const orders = await this.order.findMany({
      where: {
        restaurantId,
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    const totalOrders = orders.length;
    const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    return {
      monthlyRevenue: totalRevenue.toFixed(2),
      totalOrders,
      avgOrderValue: avgOrderValue.toFixed(2),
      growth: '0%', // Calculate against previous period if needed
    };
  }
}
