import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';

@Controller('restaurants')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Post()
  async createRestaurant(
    @Body()
    data: {
      name: string;
      owner: string;
      email: string;
      phone: string;
      address: string;
    },
  ) {
    return this.restaurantService.createRestaurant(data);
  }

  @Get()
  async getAllRestaurants() {
    return this.restaurantService.getAllRestaurants();
  }

  @Get(':id')
  async getRestaurant(@Param('id') id: string) {
    return this.restaurantService.getRestaurant(id);
  }

  @Put(':id')
  async updateRestaurant(
    @Param('id') id: string,
    @Body()
    data: Partial<{
      name: string;
      owner: string;
      email: string;
      phone: string;
      address: string;
      logo: string;
    }>,
  ) {
    return this.restaurantService.updateRestaurant(id, data);
  }

  @Delete(':id')
  async deleteRestaurant(@Param('id') id: string) {
    return this.restaurantService.deleteRestaurant(id);
  }
}
