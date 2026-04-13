import { IsNumber, IsString, Min } from 'class-validator';

export class CreateTableDto {
  @IsNumber()
  @Min(1)
  tableNumber: number;

  @IsNumber()
  @Min(1)
  seatCount: number;

  @IsString()
  restaurantId: string;
}

export class UpdateTableDto {
  @IsNumber()
  @Min(1)
  seatCount?: number;

  status?: string;
}
