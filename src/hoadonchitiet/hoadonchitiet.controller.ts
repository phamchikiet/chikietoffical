import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import {HoadonchitietService } from './hoadonchitiet.service';
@Controller('hoadonchitiet')
export class HoadonchitietController {
  constructor(private readonly hoadonchitietService:HoadonchitietService) {}

  @Post()
  create(@Body() data: any) {
    return this.hoadonchitietService.create(data);
  }
  @Get()
  async findAll() {
    return await this.hoadonchitietService.findAll();
  }
  @Get('findid/:id')
  async findOne(@Param('id') id: string) {
    return await this.hoadonchitietService.findid(id);
  }
  @Get('findslug/:slug')
  async findslug(@Param('slug') slug: string) {
    return await this.hoadonchitietService.findslug(slug);
  }
  @Post('search')
    async findQuery(@Body() SearchParams: any){
      return await this.hoadonchitietService.findQuery(SearchParams);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.hoadonchitietService.update(id, data);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hoadonchitietService.remove(id);
  }
}