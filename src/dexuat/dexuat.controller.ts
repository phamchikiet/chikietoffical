import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import {DexuatService } from './dexuat.service';
@Controller('dexuat')
export class DexuatController {
  constructor(private readonly dexuatService:DexuatService) {}

  // @Post()
  // create(@Body() data: any) {
  //   return this.dexuatService.create(data);
  // }
  // @Get()
  // async findAll() {
  //   return await this.dexuatService.findAll();
  // }
  // @Get('findid/:id')
  // async findOne(@Param('id') id: string) {
  //   return await this.dexuatService.findid(id);
  // }
  // @Get('findslug/:slug')
  // async findslug(@Param('slug') slug: string) {
  //   return await this.dexuatService.findslug(slug);
  // }
  // @Post('search')
  //   async findQuery(@Body() SearchParams: any){
  //     return await this.dexuatService.findQuery(SearchParams);
  // }
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() data: any) {
  //   return this.dexuatService.update(id, data);
  // }
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.dexuatService.remove(id);
  // }
}