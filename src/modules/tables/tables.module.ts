import { Module } from '@nestjs/common';
import { PrismaModule } from '@/common/prisma/prisma.module';
import { TablesService } from './tables.service';
import { TablesController } from './tables.controller';

@Module({
  imports: [PrismaModule],
  providers: [TablesService],
  controllers: [TablesController],
  exports: [TablesService],
})
export class TablesModule {}
