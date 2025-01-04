import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import {AclService } from './acl.service';
import { CreateAclDto } from './dto/create-acl.dto';
import { UpdateAclDto } from './dto/update-acl.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('acl')
@Controller('acl')
export class AclController {
  constructor(private readonly aclService:AclService) {}
  @Post()
  create(@Body() createAclDto: CreateAclDto) {
    return this.aclService.create(createAclDto);
  }
  @Get()
  async findAll() {
    return await this.aclService.findAll();
  }
  @Get('findid/:id')
  async findOne(@Param('id') id: string) {
    return await this.aclService.findid(id);
  }
  @Get('findslug/:slug')
  async findslug(@Param('slug') slug: string) {
    return await this.aclService.findslug(slug);
  }
  @Get('pagination')
  async findPagination(@Query('page') page: number,@Query('perPage') perPage: number){
       return await this.aclService.findPagination(page,perPage);
    }
  @Get('findquery')
    async findQuery(@Query('query') query: string){
      return await this.aclService.findQuery(query);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAclDto: UpdateAclDto) {
    return this.aclService.update(id, updateAclDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.aclService.remove(id);
  }
}