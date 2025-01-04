import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { HighlightEntity } from './entities/highlight.entity';
@Injectable()
export class HighlightService {
  constructor(
    @InjectRepository(HighlightEntity)
    private HighlightRepository: Repository<HighlightEntity>
  ) { }
  async create(data: any) {
    const check = await this.findSHD(data)
    if(!check) {
      this.HighlightRepository.create(data);
      return await this.HighlightRepository.save(data);
    }
    else {
      return { error: 1001, data: "Trùng Dữ Liệu" }
    }

  }
  async findAll() {
    return await this.HighlightRepository.find({where: {isDelete: false}});
  }
  async findid(id: string) {
    return await this.HighlightRepository.findOne({ where: { id: id } });
  }
  async findSHD(data: any) {
    return await this.HighlightRepository.findOne({
      where: {
        Title: data.Title,
        Slug: data.Slug
      },
    });
  }
  async findslug(Title: any) {
    return await this.HighlightRepository.findOne({
      where: { Title: Title },
    });
  }
  async findPagination(page: number, perPage: number) {
    const skip = (page - 1) * perPage;
    const totalItems = await this.HighlightRepository.count();
    const highlights = await this.HighlightRepository.find({ skip, take: perPage });
    return {
      currentPage: page,
      perPage,
      totalItems,
      totalPages: Math.ceil(totalItems / perPage),
      data: highlights,
    };
  }
  async findQuery(params: any) {
    console.error(params);
    const queryBuilder = this.HighlightRepository.createQueryBuilder('highlight');
    if (params.hasOwnProperty('Batdau') && params.hasOwnProperty('Ketthuc')) {
      queryBuilder.andWhere('highlight.CreateAt BETWEEN :startDate AND :endDate', {
        startDate: params.Batdau,
        endDate: params.Ketthuc,
      });
    }
    if (params.hasOwnProperty('Title')) {
      queryBuilder.andWhere('highlight.Title LIKE :Title', { Title: `%${params.Title}%` });
    }
    if (params.hasOwnProperty('Type')) {
      queryBuilder.andWhere('highlight.Type LIKE :Type', { Type: `%${params.Type}%` });
    }
    if (params.hasOwnProperty('idDM')) {
      queryBuilder.andWhere('highlight.idDM LIKE :idDM', { idDM: `${params.idDM}` });
    }
    if (params.hasOwnProperty('idDelete')) {
      queryBuilder.andWhere('highlight.idDelete LIKE :idDelete', { idDelete: params.idDelete });
    }
    const [items, totalCount] = await queryBuilder
      .limit(params.pageSize || 10) // Set a default page size if not provided
      .offset(params.pageNumber * params.pageSize || 0)
      .getManyAndCount();
    return { items, totalCount };
  }
  async update(id: string, UpdateHighlightDto: any) {
    await this.HighlightRepository.save(UpdateHighlightDto);
    return await this.HighlightRepository.findOne({ where: { id: id } });
  }
  async remove(id: string) {
    await this.HighlightRepository.delete(id);
    return { deleted: true };
  }
}
