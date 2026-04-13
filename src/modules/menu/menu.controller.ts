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
import { MenuService } from './menu.service';
import {
  CreateMenuItemDto,
  UpdateMenuItemDto,
  CreateMenuCategoryDto,
  UpdateMenuCategoryDto,
} from './dto/menu.dto';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  // ==================== MENU ITEMS ====================

  @Post('items')
  async createMenuItem(@Body() createMenuItemDto: CreateMenuItemDto) {
    return this.menuService.createMenuItem(createMenuItemDto);
  }

  @Get('items')
  async getMenuItems(
    @Query('restaurantId') restaurantId: string,
    @Query('categoryId') categoryId?: string,
  ) {
    return this.menuService.getMenuItems(restaurantId, categoryId);
  }

  @Get('items/:id')
  async getMenuItemById(@Param('id') id: string) {
    return this.menuService.getMenuItemById(id);
  }

  @Put('items/:id')
  async updateMenuItem(
    @Param('id') id: string,
    @Body() updateMenuItemDto: UpdateMenuItemDto,
  ) {
    return this.menuService.updateMenuItem(id, updateMenuItemDto);
  }

  @Delete('items/:id')
  async deleteMenuItem(@Param('id') id: string) {
    return this.menuService.deleteMenuItem(id);
  }

  @Put('items/:id/toggle-availability')
  async toggleMenuItemAvailability(@Param('id') id: string) {
    return this.menuService.toggleMenuItemAvailability(id);
  }

  @Get('items/search/:query')
  async searchMenuItems(
    @Query('restaurantId') restaurantId: string,
    @Param('query') query: string,
  ) {
    return this.menuService.searchMenuItems(restaurantId, query);
  }

  // ==================== MENU CATEGORIES ====================

  @Post('categories')
  async createCategory(@Body() createMenuCategoryDto: CreateMenuCategoryDto) {
    return this.menuService.createCategory(createMenuCategoryDto);
  }

  @Get('categories')
  async getCategories() {
    return this.menuService.getCategories();
  }

  @Get('categories/:id')
  async getCategoryById(@Param('id') id: string) {
    return this.menuService.getCategoryById(id);
  }

  @Put('categories/:id')
  async updateCategory(
    @Param('id') id: string,
    @Body() updateMenuCategoryDto: UpdateMenuCategoryDto,
  ) {
    return this.menuService.updateCategory(id, updateMenuCategoryDto);
  }

  @Delete('categories/:id')
  async deleteCategory(@Param('id') id: string) {
    return this.menuService.deleteCategory(id);
  }
}
