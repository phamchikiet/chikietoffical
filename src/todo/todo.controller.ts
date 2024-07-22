import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import {TodoService } from './todo.service';
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService:TodoService) {}

  @Post()
  create(@Body() data: any) {
    return this.todoService.create(data);
  }
  @Get()
  async findAll() {
    return await this.todoService.findAll();
  }
  @Get('findid/:id')
  async findOne(@Param('id') id: string) {
    return await this.todoService.findid(id);
  }
  @Get('findslug/:slug')
  async findslug(@Param('slug') slug: string) {
    return await this.todoService.findslug(slug);
  }
  @Post('search')
    async findQuery(@Body() SearchParams: any){
      return await this.todoService.findQuery(SearchParams);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.todoService.update(id, data);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todoService.remove(id);
  }
}