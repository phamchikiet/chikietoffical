import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CategoryEntity } from './entities/category.entity';
@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private CategoryRepository: Repository<CategoryEntity>
  ) { }
  async create(data: any) {
    const check = await this.findSHD(data)
    if(!check) {
      this.CategoryRepository.create(data);
      return await this.CategoryRepository.save(data);
    }
    else {
      return { error: 1001, data: "Trùng Dữ Liệu" }
    }

  }
  async findAll() {
    return await this.CategoryRepository.find({where: {isDelete: false}});
  }
  async findid(id: string) {
    return await this.CategoryRepository.findOne({ where: { id: id } });
  }
  async findSHD(data: any) {
    return await this.CategoryRepository.findOne({
      where: {
        Title: data.Title,
        Type: data.Type
      },
    });
  }
  async findslug(Title: any) {
    return await this.CategoryRepository.findOne({
      where: { Title: Title },
    });
  }
  async findPagination(page: number, perPage: number) {
    const skip = (page - 1) * perPage;
    const totalItems = await this.CategoryRepository.count();
    const categorys = await this.CategoryRepository.find({ skip, take: perPage });
    return {
      currentPage: page,
      perPage,
      totalItems,
      totalPages: Math.ceil(totalItems / perPage),
      data: categorys,
    };
  }
  async findQuery(params: any) {
    console.error(params);
    const queryBuilder = this.CategoryRepository.createQueryBuilder('category');
    if (params.hasOwnProperty('Batdau') && params.hasOwnProperty('Ketthuc')) {
      queryBuilder.andWhere('category.CreateAt BETWEEN :startDate AND :endDate', {
        startDate: params.Batdau,
        endDate: params.Ketthuc,
      });
    }
    if (params.hasOwnProperty('Title')) {
      queryBuilder.andWhere('category.Title LIKE :Title', { Title: `%${params.Title}%` });
    }
    if (params.hasOwnProperty('idDelete')) {
      queryBuilder.andWhere('category.idDelete LIKE :idDelete', { idDelete: params.idDelete });
    }
    const [items, totalCount] = await queryBuilder
      .limit(params.pageSize || 10) // Set a default page size if not provided
      .offset(params.pageNumber * params.pageSize || 0)
      .getManyAndCount();
    console.log(items, totalCount);

    return { items, totalCount };
  }
  async update(id: string, UpdateCategoryDto: any) {
    await this.CategoryRepository.save(UpdateCategoryDto);
    return await this.CategoryRepository.findOne({ where: { id: id } });
  }
  async remove(id: string) {
    await this.CategoryRepository.delete(id);
    return { deleted: true };
  }
}
