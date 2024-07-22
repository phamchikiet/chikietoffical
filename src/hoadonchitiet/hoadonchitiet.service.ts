import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { HoadonchitietEntity } from './entities/hoadonchitiet.entity';
@Injectable()
export class HoadonchitietService {
  constructor(
    @InjectRepository(HoadonchitietEntity)
    private HoadonchitietRepository: Repository<HoadonchitietEntity>
  ) { }
  async create(data: any) {
    const check = await this.findSHD(data)
    if(!check) {
      this.HoadonchitietRepository.create(data);
      return await this.HoadonchitietRepository.save(data);
    }
    else {
      return { error: 1001, data: "Trùng Dữ Liệu" }
    }
  }
  async findAll() {
    return await this.HoadonchitietRepository.find();
  }
  async findid(id: string) {
    return await this.HoadonchitietRepository.findOne({ where: { id: id } });
  }
  async findSHD(data: any) {
    return await this.HoadonchitietRepository.findOne({
      where: {
        nbmst: data.nbmst,
        khmshdon: data.khmshdon,
        khhdon: data.khhdon,
        shdon: data.shdon
      },
    });
  }
  async findslug(Title: any) {
    return await this.HoadonchitietRepository.findOne({
      where: { shdon: Title },
    });
  }
  async findPagination(page: number, perPage: number) {
    const skip = (page - 1) * perPage;
    const totalItems = await this.HoadonchitietRepository.count();
    const hoadonchitiets = await this.HoadonchitietRepository.find({ skip, take: perPage });
    return {
      currentPage: page,
      perPage,
      totalItems,
      totalPages: Math.ceil(totalItems / perPage),
      data: hoadonchitiets,
    };
  }
  async findQuery(params: any) {
    console.error(params);
    const queryBuilder = this.HoadonchitietRepository.createQueryBuilder('hoadonchitiet');
    if (params.Batdau && params.Ketthuc) {
      queryBuilder.andWhere('hoadonchitiet.CreateAt BETWEEN :startDate AND :endDate', {
        startDate: params.Batdau,
        endDate: params.Ketthuc,
      });
    }
    if (params.Title) {
      queryBuilder.andWhere('hoadonchitiet.Title LIKE :Title', { SDT: `%${params.Title}%` });
    }
    if (params.thlap) {
      queryBuilder.andWhere('hoadonchitiet.thlap LIKE :thlap', { thlap: `${params.thlap}` });
    }
    const [items, totalCount] = await queryBuilder
      .limit(params.pageSize || 10) // Set a default page size if not provided
      .offset(params.pageNumber * params.pageSize || 0)
      .getManyAndCount();
    console.log(items, totalCount);

    return { items, totalCount };
  }
  async update(id: string, UpdateHoadonchitietDto: any) {
    this.HoadonchitietRepository.save(UpdateHoadonchitietDto);
    return await this.HoadonchitietRepository.findOne({ where: { id: id } });
  }
  async remove(id: string) {
    console.error(id)
    await this.HoadonchitietRepository.delete(id);
    return { deleted: true };
  }
}
