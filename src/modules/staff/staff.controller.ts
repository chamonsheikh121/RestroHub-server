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
import { StaffService } from './staff.service';
import { CreateStaffDto, UpdateStaffDto } from './dto/staff.dto';
import { StaffStatus } from '@prisma/client';

@Controller('staff')
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @Post()
  async createStaff(@Body() createStaffDto: CreateStaffDto) {
    return this.staffService.createStaff(createStaffDto);
  }

  @Get()
  async getStaff(
    @Query('restaurantId') restaurantId: string,
    @Query('status') status?: StaffStatus,
  ) {
    return this.staffService.getStaff(restaurantId, status);
  }

  @Get(':id')
  async getStaffById(@Param('id') id: string) {
    return this.staffService.getStaffById(id);
  }

  @Put(':id')
  async updateStaff(
    @Param('id') id: string,
    @Body() updateStaffDto: UpdateStaffDto,
  ) {
    return this.staffService.updateStaff(id, updateStaffDto);
  }

  @Delete(':id')
  async deleteStaff(@Param('id') id: string) {
    return this.staffService.deleteStaff(id);
  }

  @Put(':id/status')
  async updateStaffStatus(
    @Param('id') id: string,
    @Body('status') status: StaffStatus,
  ) {
    return this.staffService.updateStaffStatus(id, status);
  }

  @Get('online/:restaurantId')
  async getOnlineStaff(@Param('restaurantId') restaurantId: string) {
    return this.staffService.getOnlineStaff(restaurantId);
  }

  @Get('stats/:restaurantId')
  async getStaffStats(@Param('restaurantId') restaurantId: string) {
    return this.staffService.getStaffStats(restaurantId);
  }
}
