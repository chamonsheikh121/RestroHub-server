import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { TablesService } from './tables.service';
import { CreateTableDto, UpdateTableDto } from './dto/tables.dto';
import { TableStatus } from '@prisma/client';

@Controller('tables')
export class TablesController {
  constructor(private readonly tablesService: TablesService) {}

  @Post()
  async createTable(@Body() createTableDto: CreateTableDto) {
    return this.tablesService.createTable(createTableDto);
  }

  @Get()
  async getTables(
    @Query('restaurantId') restaurantId: string,
    @Query('status') status?: TableStatus,
  ) {
    return this.tablesService.getTables(restaurantId, status);
  }

  @Get(':id')
  async getTableById(@Param('id') id: string) {
    return this.tablesService.getTableById(id);
  }

  @Put(':id')
  async updateTable(
    @Param('id') id: string,
    @Body() updateTableDto: UpdateTableDto,
  ) {
    return this.tablesService.updateTable(id, updateTableDto);
  }

  @Delete(':id')
  async deleteTable(@Param('id') id: string) {
    return this.tablesService.deleteTable(id);
  }

  @Put(':id/status')
  async updateTableStatus(
    @Param('id') id: string,
    @Body('status') status: TableStatus,
  ) {
    return this.tablesService.updateTableStatus(id, status);
  }

  @Get('available/:restaurantId')
  async getAvailableTables(@Param('restaurantId') restaurantId: string) {
    return this.tablesService.getAvailableTables(restaurantId);
  }

  @Get('stats/:restaurantId')
  async getTableStats(@Param('restaurantId') restaurantId: string) {
    return this.tablesService.getTableStats(restaurantId);
  }
}
