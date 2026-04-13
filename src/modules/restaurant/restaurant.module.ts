import { Module } from '@nestjs/common';
import { PrismaModule } from '@/common/prisma/prisma.module';
import { RestaurantService } from './restaurant.service';
import { RestaurantController } from './restaurant.controller';

@Module({
  imports: [PrismaModule],
  controllers: [RestaurantController],
  exports: [RestaurantService],
})
export class RestaurantModule {}
