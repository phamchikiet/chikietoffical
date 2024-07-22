import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import {TodocategoryService } from './todocategory.service';
@Controller('todocategory')
export class TodocategoryController {
  constructor(private readonly todocategoryService:TodocategoryService) {}

  @Post()
  create(@Body() data: any) {
    return this.todocategoryService.create(data);
  }
  @Get()
  async findAll() {
    return await this.todocategoryService.findAll();
  }
  @Get('findid/:id')
  async findOne(@Param('id') id: string) {
    return await this.todocategoryService.findid(id);
  }
  @Get('findslug/:slug')
  async findslug(@Param('slug') slug: string) {
    return await this.todocategoryService.findslug(slug);
  }
  @Post('search')
    async findQuery(@Body() SearchParams: any){
      return await this.todocategoryService.findQuery(SearchParams);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.todocategoryService.update(id, data);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todocategoryService.remove(id);
  }
}