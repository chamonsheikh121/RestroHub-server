import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/common/prisma/prisma.service';

@Injectable()
export class RestaurantService {
  constructor(private prisma: PrismaService) {}

  async createRestaurant(data: {
    name: string;
    owner: string;
    email: string;
    phone: string;
    address: string;
  }) {
    return this.restaurant.create({
      data,
    });
  }

  async getRestaurant(id: string) {
    return this.restaurant.findUnique({
      where: { id },
      include: { settings: true },
    });
  }

  async getAllRestaurants() {
    return this.restaurant.findMany({
      include: { settings: true },
    });
  }

  async updateRestaurant(
    id: string,
    data: Partial<{
      name: string;
      owner: string;
      email: string;
      phone: string;
      address: string;
      logo: string;
    }>,
  ) {
    return this.restaurant.update({
      where: { id },
      data,
      include: { settings: true },
    });
  }

  async deleteRestaurant(id: string) {
    return this.restaurant.delete({
      where: { id },
    });
  }
}
