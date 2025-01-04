import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { SettingEntity } from './entities/setting.entity';
@Injectable()
export class SettingService {
  constructor(
    @InjectRepository(SettingEntity)
    private SettingRepository: Repository<SettingEntity>
  ) { }
  async create(data: any) {
    const check = await this.findSHD(data)
    if(!check) {
      this.SettingRepository.create(data);
      return await this.SettingRepository.save(data);
    }
    else {
      return { error: 1001, data: "Trùng Dữ Liệu" }
    }

  }
  async findAll() {
    return await this.SettingRepository.find({where: {isDelete: false}});
  }
  async findid(id: string) {
    return await this.SettingRepository.findOne({ where: { id: id } });
  }
  async findSHD(data: any) {
    return await this.SettingRepository.findOne({
      where: {
        Title: data.Title,
        Type: data.Type
      },
    });
  }
  async findslug(slug: any) {
    return await this.SettingRepository.findOne({
      where: { Slug: slug },
    });
  }
  async findPagination(page: number, perPage: number) {
    const skip = (page - 1) * perPage;
    const totalItems = await this.SettingRepository.count();
    const settings = await this.SettingRepository.find({ skip, take: perPage });
    return {
      currentPage: page,
      perPage,
      totalItems,
      totalPages: Math.ceil(totalItems / perPage),
      data: settings,
    };
  }
  async findQuery(params: any) {
    console.error(params);
    const queryBuilder = this.SettingRepository.createQueryBuilder('setting');
    if (params.hasOwnProperty('Batdau') && params.hasOwnProperty('Ketthuc')) {
      queryBuilder.andWhere('setting.CreateAt BETWEEN :startDate AND :endDate', {
        startDate: params.Batdau,
        endDate: params.Ketthuc,
      });
    }
    if (params.hasOwnProperty('Title')) {
      queryBuilder.andWhere('setting.Title LIKE :Title', { Title: `%${params.Title}%` });
    }
    if (params.hasOwnProperty('Type')) {
      queryBuilder.andWhere('setting.Type LIKE :Type', { Type: `${params.Type}` });
    }
    if (params.hasOwnProperty('idDelete')) {
      queryBuilder.andWhere('setting.idDelete LIKE :idDelete', { idDelete: params.idDelete });
    }
    const [items, totalCount] = await queryBuilder
      .limit(params.pageSize || 10) // Set a default page size if not provided
      .offset(params.pageNumber * params.pageSize || 0)
      .getManyAndCount();
    console.log(items, totalCount);

    return { items, totalCount };
  }
  async update(id: string, UpdateSettingDto: any) {
    await this.SettingRepository.save(UpdateSettingDto);
    return await this.SettingRepository.findOne({ where: { id: id } });
  }
  async remove(id: string) {
    await this.SettingRepository.delete(id);
    return { deleted: true };
  }
}
