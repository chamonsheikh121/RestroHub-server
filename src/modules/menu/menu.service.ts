import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/common/prisma/prisma.service';
import { CreateMenuItemDto, UpdateMenuItemDto, CreateMenuCategoryDto, UpdateMenuCategoryDto } from './dto/menu.dto';

@Injectable()
export class MenuService {
  constructor(private prisma: PrismaService) {}

  // ==================== MENU ITEMS ====================

  async createMenuItem(data: CreateMenuItemDto) {
    return this.prisma.client.menuItem.create({
      data,
      include: { category: true },
    });
  }

  async getMenuItems(restaurantId: string, categoryId?: string) {
    return this.prisma.client.menuItem.findMany({
      where: {
        restaurantId,
        ...(categoryId && { categoryId }),
      },
      include: { category: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getMenuItemById(id: string) {
    return this.prisma.client.menuItem.findUnique({
      where: { id },
      include: { category: true },
    });
  }

  async updateMenuItem(id: string, data: UpdateMenuItemDto) {
    return this.prisma.client.menuItem.update({
      where: { id },
      data,
      include: { category: true },
    });
  }

  async deleteMenuItem(id: string) {
    return this.prisma.client.menuItem.delete({
      where: { id },
    });
  }

  async toggleMenuItemAvailability(id: string) {
    const item = await this.prisma.client.menuItem.findUnique({ where: { id } });
    return this.prisma.client.menuItem.update({
      where: { id },
      data: { isAvailable: !item?.isAvailable },
      include: { category: true },
    });
  }

  // ==================== MENU CATEGORIES ====================

  async createCategory(data: CreateMenuCategoryDto) {
    return this.prisma.client.menuCategory.create({
      data,
    });
  }

  async getCategories() {
    return this.prisma.client.menuCategory.findMany({
      include: { items: true },
    });
  }

  async getCategoryById(id: string) {
    return this.prisma.client.menuCategory.findUnique({
      where: { id },
      include: { items: true },
    });
  }

  async updateCategory(id: string, data: UpdateMenuCategoryDto) {
    return this.prisma.client.menuCategory.update({
      where: { id },
      data,
    });
  }

  async deleteCategory(id: string) {
    return this.prisma.client.menuCategory.delete({
      where: { id },
    });
  }

  async searchMenuItems(restaurantId: string, query: string) {
    return this.prisma.client.menuItem.findMany({
      where: {
        restaurantId,
        name: {
          contains: query,
          mode: 'insensitive',
        },
      },
      include: { category: true },
    });
  }
}
