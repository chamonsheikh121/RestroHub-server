import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/common/prisma/prisma.service';
import { CreateStaffDto, UpdateStaffDto } from './dto/staff.dto';
import { StaffStatus } from '@prisma/client';

@Injectable()
export class StaffService {
  constructor(private prisma: PrismaService) {}

  async createStaff(data: CreateStaffDto) {
    return this.staff.create({
      data,
    });
  }

  async getStaff(restaurantId: string, status?: StaffStatus) {
    return this.staff.findMany({
      where: {
        restaurantId,
        ...(status && { status }),
      },
      include: { orders: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getStaffById(id: string) {
    return this.staff.findUnique({
      where: { id },
      include: { orders: true },
    });
  }

  async updateStaff(id: string, data: UpdateStaffDto) {
    return this.staff.update({
      where: { id },
      data,
      include: { orders: true },
    });
  }

  async deleteStaff(id: string) {
    return this.staff.delete({
      where: { id },
    });
  }

  async updateStaffStatus(id: string, status: StaffStatus) {
    return this.staff.update({
      where: { id },
      data: { status },
    });
  }

  async getOnlineStaff(restaurantId: string) {
    return this.staff.findMany({
      where: {
        restaurantId,
        status: StaffStatus.ONLINE,
      },
      include: { orders: true },
    });
  }

  async getStaffStats(restaurantId: string) {
    const staff = await this.staff.findMany({
      where: { restaurantId },
    });

    const online = staff.filter((s) => s.status === StaffStatus.ONLINE).length;
    const offline = staff.filter((s) => s.status === StaffStatus.OFFLINE).length;
    const onLeave = staff.filter((s) => s.status === StaffStatus.ON_LEAVE).length;
    const pending = staff.filter((s) => s.status === StaffStatus.PENDING).length;

    return {
      total: staff.length,
      online,
      offline,
      onLeave,
      pending,
    };
  }
}
