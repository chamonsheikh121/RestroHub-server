import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/common/prisma/prisma.service';
import { CreateReservationDto, UpdateReservationDto } from './dto/reservations.dto';
import { ReservationStatus } from '@prisma/client';

@Injectable()
export class ReservationsService {
  constructor(private prisma: PrismaService) {}

  async createReservation(data: CreateReservationDto) {
    return this.reservation.create({
      data,
      include: { table: true },
    });
  }

  async getReservations(restaurantId?: string, status?: ReservationStatus) {
    return this.reservation.findMany({
      where: {
        ...(status && { status }),
      },
      include: { table: true },
      orderBy: { reservationDate: 'asc' },
    });
  }

  async getReservationById(id: string) {
    return this.reservation.findUnique({
      where: { id },
      include: { table: true },
    });
  }

  async getReservationsByTable(tableId: string) {
    return this.reservation.findMany({
      where: { tableId },
      include: { table: true },
      orderBy: { reservationDate: 'asc' },
    });
  }

  async updateReservation(id: string, data: UpdateReservationDto) {
    return this.reservation.update({
      where: { id },
      data,
      include: { table: true },
    });
  }

  async deleteReservation(id: string) {
    return this.reservation.delete({
      where: { id },
    });
  }

  async updateReservationStatus(id: string, status: ReservationStatus) {
    return this.reservation.update({
      where: { id },
      data: { status },
      include: { table: true },
    });
  }

  async getUpcomingReservations(hours: number = 24) {
    const now = new Date();
    const future = new Date(now.getTime() + hours * 60 * 60 * 1000);

    return this.reservation.findMany({
      where: {
        reservationDate: {
          gte: now,
          lte: future,
        },
        status: {
          in: [ReservationStatus.PENDING, ReservationStatus.CONFIRMED],
        },
      },
      include: { table: true },
      orderBy: { reservationDate: 'asc' },
    });
  }

  async cancelExpiredReservations() {
    return this.reservation.updateMany({
      where: {
        reservationDate: {
          lt: new Date(),
        },
        status: ReservationStatus.PENDING,
      },
      data: { status: ReservationStatus.CANCELLED },
    });
  }
}
