import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateAclDto } from './dto/create-acl.dto';
import { UpdateAclDto } from './dto/update-acl.dto';
import { AclEntity } from './entities/acl.entity';
@Injectable()
export class AclService {
  constructor(
    @InjectRepository(AclEntity)
    private AclRepository: Repository<AclEntity>
  ) {}
  async create(CreateAclDto: CreateAclDto) {
    this.AclRepository.create(CreateAclDto);
    return await this.AclRepository.save(CreateAclDto);
  }

  async findAll() {
    return await this.AclRepository.find();
  }
  async findid(id: string) {
    return await this.AclRepository.findOne({
      where: { id: id },

    });
  }
  async findslug(slug: any) {
    return await this.AclRepository.findOne({
      where: { Slug: slug},
    });
  }
  async findPagination(page: number, perPage: number){
    const skip = (page - 1) * perPage;
    const totalItems = await this.AclRepository.count();
    const acls = await this.AclRepository.find({ skip, take: perPage });
    return {
      currentPage: page,
      perPage,
      totalItems,
      totalPages: Math.ceil(totalItems / perPage),
      data: acls,
    };
  }
  async findQuery(query: string){
    return await this.AclRepository.find({
      where: { Title: Like(`%query%`) },
    });
  }
  async update(id: string, UpdateAclDto: UpdateAclDto) {
    this.AclRepository.save(UpdateAclDto);
    return await this.AclRepository.findOne({ where: { id: id } });
  }
  async remove(id: string) {
    console.error(id)
    await this.AclRepository.delete(id);
    return { deleted: true };
  }
}
