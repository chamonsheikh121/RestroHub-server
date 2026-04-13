import { IsString, IsDateString, IsNumber, IsEnum, IsOptional, Min } from 'class-validator';
import { ReservationStatus } from '@prisma/client';

export class CreateReservationDto {
  @IsString()
  customerName: string;

  @IsString()
  customerEmail: string;

  @IsString()
  customerPhone: string;

  @IsDateString()
  reservationDate: string;

  @IsNumber()
  @Min(1)
  partySize: number;

  @IsString()
  tableId: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

export class UpdateReservationDto {
  @IsOptional()
  @IsEnum(ReservationStatus)
  status?: ReservationStatus;

  @IsOptional()
  @IsString()
  notes?: string;
}
