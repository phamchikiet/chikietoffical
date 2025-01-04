import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import {SettingService } from './settings.service';
@Controller('setting')
export class SettingController {
  constructor(private readonly settingService:SettingService) {}

  @Post()
  create(@Body() data: any) {
    return this.settingService.create(data);
  }
  @Get()
  async findAll() {
    return await this.settingService.findAll();
  }
  @Get('findid/:id')
  async findOne(@Param('id') id: string) {
    return await this.settingService.findid(id);
  }
  @Get('findslug/:slug')
  async findslug(@Param('slug') slug: string) {
    return await this.settingService.findslug(slug);
  }
  @Post('search')
    async findQuery(@Body() SearchParams: any){
      return await this.settingService.findQuery(SearchParams);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.settingService.update(id, data);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.settingService.remove(id);
  }
}