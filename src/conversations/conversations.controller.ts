import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import {ConversationService } from './conversations.service';
@Controller('conversation')
export class ConversationController {
  constructor(private readonly conversationService:ConversationService) {}

  @Post()
  create(@Body() data: any) {
    return this.conversationService.create(data);
  }
  @Get()
  async findAll() {
    return await this.conversationService.findAll();
  }
  @Get('findid/:id')
  async findOne(@Param('id') id: string) {
    return await this.conversationService.findid(id);
  }
  @Get('findslug/:slug')
  async findslug(@Param('slug') slug: string) {
    return await this.conversationService.findslug(slug);
  }
  @Post('search')
    async findQuery(@Body() SearchParams: any){
      return await this.conversationService.findQuery(SearchParams);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.conversationService.update(id, data);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.conversationService.remove(id);
  }
}