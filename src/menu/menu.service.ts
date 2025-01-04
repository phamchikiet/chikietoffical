
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { MenuEntity } from './entities/menu.entity';
@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(MenuEntity)
    private MenuRepository: Repository<MenuEntity>
  ) { }
  async create(data: any) {
    const check = await this.findSHD(data)
    if(!check) {
      this.MenuRepository.create(data);
      return await this.MenuRepository.save(data);
    }
    else {
      return { error: 1001, data: "Trùng Dữ Liệu" }
    }

  }
  async findAll() {
    return await this.MenuRepository.find({where: {isDelete: false}});
  }
  async findid(id: string) {
    return await this.MenuRepository.findOne({ where: { id: id } });
  }
  async findSHD(data: any) {
    return await this.MenuRepository.findOne({
      where: {
        Title: data.Title,
        Type: data.Type
      },
    });
  }
  async findslug(Title: any) {
    return await this.MenuRepository.findOne({
      where: { Title: Title },
    });
  }
  async findPagination(page: number, perPage: number) {
    const skip = (page - 1) * perPage;
    const totalItems = await this.MenuRepository.count();
    const menus = await this.MenuRepository.find({ skip, take: perPage });
    return {
      currentPage: page,
      perPage,
      totalItems,
      totalPages: Math.ceil(totalItems / perPage),
      data: menus,
    };
  }
  async findQuery(params: any) {
    console.error(params);
    const queryBuilder = this.MenuRepository.createQueryBuilder('menu');
    if (params.hasOwnProperty('Batdau') && params.hasOwnProperty('Ketthuc')) {
      queryBuilder.andWhere('menu.CreateAt BETWEEN :startDate AND :endDate', {
        startDate: params.Batdau,
        endDate: params.Ketthuc,
      });
    }
    if (params.hasOwnProperty('Title')) {
      queryBuilder.andWhere('menu.Title LIKE :Title', { Title: `%${params.Title}%` });
    }
    if (params.hasOwnProperty('Type')) {
      queryBuilder.andWhere('menu.Type LIKE :Type', { Type: `${params.Type}` });
    }
    if (params.hasOwnProperty('idDelete')) {
      queryBuilder.andWhere('menu.idDelete LIKE :idDelete', { idDelete: params.idDelete });
    }
    const [items, totalCount] = await queryBuilder
      .limit(params.pageSize || 10) // Set a default page size if not provided
      .offset(params.pageNumber * params.pageSize || 0)
      .getManyAndCount();
    console.log(items, totalCount);

    return { items, totalCount };
  }
  async update(id: string, UpdateMenuDto: any) {
    await this.MenuRepository.save(UpdateMenuDto);
    return await this.MenuRepository.findOne({ where: { id: id } });
  }
  async remove(id: string) {
    await this.MenuRepository.delete(id);
    return { deleted: true };
  }
}
