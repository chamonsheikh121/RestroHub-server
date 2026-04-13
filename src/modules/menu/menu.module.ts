import { Module } from '@nestjs/common';
import { PrismaModule } from '@/common/prisma/prisma.module';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';

@Module({
  imports: [PrismaModule],
  providers: [MenuService],
  controllers: [MenuController],
  exports: [MenuService],
})
export class MenuModule {}
