import { IsString, IsOptional, IsNumber, Min } from 'class-validator';

export class CreateMenuItemDto {
  @IsString()
  name: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsString()
  categoryId: string;

  @IsString()
  restaurantId: string;

  @IsOptional()
  @IsString()
  emoji?: string;
}

export class UpdateMenuItemDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;

  @IsOptional()
  @IsString()
  categoryId?: string;

  @IsOptional()
  @IsString()
  emoji?: string;

  @IsOptional()
  isAvailable?: boolean;
}

export class CreateMenuCategoryDto {
  @IsString()
  name: string;
}

export class UpdateMenuCategoryDto {
  @IsOptional()
  @IsString()
  name?: string;
}
