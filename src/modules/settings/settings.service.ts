import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/common/prisma/prisma.service';
import { UpdateSettingsDto } from './dto/settings.dto';

@Injectable()
export class SettingsService {
  constructor(private prisma: PrismaService) {}

  async getRestaurantSettings(restaurantId: string) {
    return this.restaurant.findUnique({
      where: { id: restaurantId },
      include: { settings: true },
    });
  }

  async getSettings(restaurantId: string) {
    return this.restaurantSettings.findUnique({
      where: { restaurantId },
    });
  }

  async updateSettings(restaurantId: string, data: UpdateSettingsDto) {
    const { taxRate, currency, ...restaurantData } = data;

    // Update restaurant info
    if (Object.keys(restaurantData).length > 0) {
      await this.restaurant.update({
        where: { id: restaurantId },
        data: restaurantData,
      });
    }

    // Update settings
    const existingSettings = await this.restaurantSettings.findUnique({
      where: { restaurantId },
    });

    if (existingSettings) {
      return this.restaurantSettings.update({
        where: { restaurantId },
        data: {
          ...(taxRate && { taxRate }),
          ...(currency && { currency }),
        },
      });
    }

    // Create if doesn't exist
    return this.restaurantSettings.create({
      data: {
        restaurantId,
        taxRate: taxRate || 8,
        currency: currency || 'USD',
      },
    });
  }

  async getRestaurantProfile(restaurantId: string) {
    return this.restaurant.findUnique({
      where: { id: restaurantId },
    });
  }

  async updateRestaurantProfile(restaurantId: string, data: UpdateSettingsDto) {
    const { taxRate, currency, ...restaurantData } = data;

    return this.restaurant.update({
      where: { id: restaurantId },
      data: restaurantData,
    });
  }
}
