import { IsString, IsOptional, IsNumber, IsEnum, Min, IsArray } from 'class-validator';
import { OrderStatus, OrderType } from '@prisma/client';

export class CreateOrderDto {
  @IsEnum(OrderType)
  orderType: OrderType;

  @IsOptional()
  @IsString()
  tableId?: string;

  @IsOptional()
  @IsString()
  staffId?: string;

  @IsString()
  restaurantId: string;

  @IsArray()
  items: Array<{
    menuItemId: string;
    quantity: number;
  }>;
}

export class UpdateOrderStatusDto {
  @IsEnum(OrderStatus)
  status: OrderStatus;
}

export class AddOrderItemDto {
  @IsString()
  menuItemId: string;

  @IsNumber()
  @Min(1)
  quantity: number;
}

export class UpdateOrderItemDto {
  @IsNumber()
  @Min(1)
  quantity: number;
}
