import { IsString, IsEnum, IsOptional, IsDateString } from 'class-validator';
import { StaffRole } from '@prisma/client';

export class CreateStaffDto {
  @IsString()
  name: string;

  @IsEnum(StaffRole)
  role: StaffRole;

  @IsString()
  phone: string;

  @IsDateString()
  hireDate: string;

  @IsString()
  restaurantId: string;
}

export class UpdateStaffDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEnum(StaffRole)
  role?: StaffRole;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  status?: string;
}
