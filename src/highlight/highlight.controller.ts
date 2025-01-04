import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import {HighlightService } from './highlight.service';
@Controller('highlight')
export class HighlightController {
  constructor(private readonly highlightService:HighlightService) {}

  @Post()
  create(@Body() data: any) {
    return this.highlightService.create(data);
  }
  @Get()
  async findAll() {
    return await this.highlightService.findAll();
  }
  @Get('findid/:id')
  async findOne(@Param('id') id: string) {
    return await this.highlightService.findid(id);
  }
  @Get('findslug/:slug')
  async findslug(@Param('slug') slug: string) {
    return await this.highlightService.findslug(slug);
  }
  @Post('search')
    async findQuery(@Body() SearchParams: any){
      console.log(SearchParams);
      
      return await this.highlightService.findQuery(SearchParams);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.highlightService.update(id, data);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.highlightService.remove(id);
  }
}