import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import {
  CreateReservationDto,
  UpdateReservationDto,
} from './dto/reservations.dto';
import { ReservationStatus } from '@prisma/client';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post()
  async createReservation(@Body() createReservationDto: CreateReservationDto) {
    return this.reservationsService.createReservation(createReservationDto);
  }

  @Get()
  async getReservations() {
    return this.reservationsService.getReservations();
  }

  @Get(':id')
  async getReservationById(@Param('id') id: string) {
    return this.reservationsService.getReservationById(id);
  }

  @Get('table/:tableId')
  async getReservationsByTable(@Param('tableId') tableId: string) {
    return this.reservationsService.getReservationsByTable(tableId);
  }

  @Put(':id')
  async updateReservation(
    @Param('id') id: string,
    @Body() updateReservationDto: UpdateReservationDto,
  ) {
    return this.reservationsService.updateReservation(id, updateReservationDto);
  }

  @Delete(':id')
  async deleteReservation(@Param('id') id: string) {
    return this.reservationsService.deleteReservation(id);
  }

  @Put(':id/status')
  async updateReservationStatus(
    @Param('id') id: string,
    @Body('status') status: ReservationStatus,
  ) {
    return this.reservationsService.updateReservationStatus(id, status);
  }

  @Get('upcoming/:hours')
  async getUpcomingReservations(@Param('hours') hours: string) {
    return this.reservationsService.getUpcomingReservations(parseInt(hours));
  }
}
