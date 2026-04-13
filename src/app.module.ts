import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { PrismaModule } from './common/prisma/prisma.module';
import { MenuModule } from './modules/menu/menu.module';
import { OrdersModule } from './modules/orders/orders.module';
import { TablesModule } from './modules/tables/tables.module';
import { StaffModule } from './modules/staff/staff.module';
import { ReservationsModule } from './modules/reservations/reservations.module';
import { ReportsModule } from './modules/reports/reports.module';
import { SettingsModule } from './modules/settings/settings.module';
import { RestaurantModule } from './modules/restaurant/restaurant.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UserModule,
    MenuModule,
    OrdersModule,
    TablesModule,
    StaffModule,
    ReservationsModule,
    ReportsModule,
    SettingsModule,
    RestaurantModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
