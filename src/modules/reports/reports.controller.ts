import {
  Controller,
  Get,
  Query,
  Param,
} from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportFiltersDto } from './dto/reports.dto';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('dashboard/:restaurantId')
  async getDashboardStats(@Param('restaurantId') restaurantId: string) {
    return this.reportsService.getDashboardStats(restaurantId);
  }

  @Get('sales/:restaurantId')
  async getMonthlySalesData(
    @Param('restaurantId') restaurantId: string,
    @Query() filters: ReportFiltersDto,
  ) {
    return this.reportsService.getMonthlySalesData(restaurantId, filters);
  }

  @Get('order-distribution/:restaurantId')
  async getOrderTypeDistribution(@Param('restaurantId') restaurantId: string) {
    return this.reportsService.getOrderTypeDistribution(restaurantId);
  }

  @Get('top-items/:restaurantId')
  async getTopSellingItems(@Param('restaurantId') restaurantId: string) {
    return this.reportsService.getTopSellingItems(restaurantId);
  }

  @Get('revenue/:restaurantId')
  async getRevenueStats(
    @Param('restaurantId') restaurantId: string,
    @Query() filters: ReportFiltersDto,
  ) {
    return this.reportsService.getRevenueStats(restaurantId, filters);
  }
}
