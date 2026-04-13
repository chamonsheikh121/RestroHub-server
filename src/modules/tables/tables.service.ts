import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/common/prisma/prisma.service';
import { CreateTableDto, UpdateTableDto } from './dto/tables.dto';
import { TableStatus } from '@prisma/client';

@Injectable()
export class TablesService {
  constructor(private prisma: PrismaService) {}

  async createTable(data: CreateTableDto) {
    return this.table.create({
      data,
      include: { reservations: true },
    });
  }

  async getTables(restaurantId: string, status?: TableStatus) {
    return this.table.findMany({
      where: {
        restaurantId,
        ...(status && { status }),
      },
      include: { reservations: true, orders: true },
      orderBy: { tableNumber: 'asc' },
    });
  }

  async getTableById(id: string) {
    return this.table.findUnique({
      where: { id },
      include: { reservations: true, orders: true },
    });
  }

  async updateTable(id: string, data: UpdateTableDto) {
    return this.table.update({
      where: { id },
      data,
      include: { reservations: true },
    });
  }

  async deleteTable(id: string) {
    return this.table.delete({
      where: { id },
    });
  }

  async updateTableStatus(id: string, status: TableStatus) {
    return this.table.update({
      where: { id },
      data: { status },
    });
  }

  async getAvailableTables(restaurantId: string) {
    return this.table.findMany({
      where: {
        restaurantId,
        status: TableStatus.AVAILABLE,
      },
      orderBy: { tableNumber: 'asc' },
    });
  }

  async getTableStats(restaurantId: string) {
    const tables = await this.table.findMany({
      where: { restaurantId },
    });

    const available = tables.filter((t) => t.status === TableStatus.AVAILABLE).length;
    const occupied = tables.filter((t) => t.status === TableStatus.OCCUPIED).length;
    const reserved = tables.filter((t) => t.status === TableStatus.RESERVED).length;

    return {
      total: tables.length,
      available,
      occupied,
      reserved,
      occupancyRate: tables.length > 0 ? (occupied / tables.length) * 100 : 0,
    };
  }
}
