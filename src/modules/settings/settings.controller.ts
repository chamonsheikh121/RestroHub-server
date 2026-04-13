import {
  Controller,
  Get,
  Put,
  Body,
  Param,
} from '@nestjs/common';
import { SettingsService } from './settings.service';
import { UpdateSettingsDto } from './dto/settings.dto';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get('restaurant/:restaurantId')
  async getRestaurantSettings(@Param('restaurantId') restaurantId: string) {
    return this.settingsService.getRestaurantSettings(restaurantId);
  }

  @Get(':restaurantId')
  async getSettings(@Param('restaurantId') restaurantId: string) {
    return this.settingsService.getSettings(restaurantId);
  }

  @Put(':restaurantId')
  async updateSettings(
    @Param('restaurantId') restaurantId: string,
    @Body() updateSettingsDto: UpdateSettingsDto,
  ) {
    return this.settingsService.updateSettings(restaurantId, updateSettingsDto);
  }

  @Get('profile/:restaurantId')
  async getRestaurantProfile(@Param('restaurantId') restaurantId: string) {
    return this.settingsService.getRestaurantProfile(restaurantId);
  }

  @Put('profile/:restaurantId')
  async updateRestaurantProfile(
    @Param('restaurantId') restaurantId: string,
    @Body() updateSettingsDto: UpdateSettingsDto,
  ) {
    return this.settingsService.updateRestaurantProfile(
      restaurantId,
      updateSettingsDto,
    );
  }
}
