import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import {CategoryService } from './category.service';
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService:CategoryService) {}

  @Post()
  create(@Body() data: any) {
    return this.categoryService.create(data);
  }
  @Get()
  async findAll() {
    return await this.categoryService.findAll();
  }
  @Get('findid/:id')
  async findOne(@Param('id') id: string) {
    return await this.categoryService.findid(id);
  }
  @Get('findslug/:slug')
  async findslug(@Param('slug') slug: string) {
    return await this.categoryService.findslug(slug);
  }
  @Post('search')
    async findQuery(@Body() SearchParams: any){
      return await this.categoryService.findQuery(SearchParams);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.categoryService.update(id, data);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }
}