import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { TodocategoryEntity } from './entities/todocategory.entity';
@Injectable()
export class TodocategoryService {
  constructor(
    @InjectRepository(TodocategoryEntity)
    private TodocategoryRepository: Repository<TodocategoryEntity>
  ) { }
  async create(data: any) {
    const check = await this.findSHD(data)
    if(!check) {
      this.TodocategoryRepository.create(data);
      return await this.TodocategoryRepository.save(data);
    }
    else {
      return { error: 1001, data: "Trùng Dữ Liệu" }
    }

  }
  async findAll() {
    return await this.TodocategoryRepository.find();
  }
  async findid(id: string) {
    return await this.TodocategoryRepository.findOne({ where: { id: id } });
  }
  async findSHD(data: any) {
    return await this.TodocategoryRepository.findOne({
      where: {
        Title: data.Title,
        Type: data.Type
      },
    });
  }
  async findslug(Title: any) {
    return await this.TodocategoryRepository.findOne({
      where: { Title: Title },
    });
  }
  async findPagination(page: number, perPage: number) {
    const skip = (page - 1) * perPage;
    const totalItems = await this.TodocategoryRepository.count();
    const todocategorys = await this.TodocategoryRepository.find({ skip, take: perPage });
    return {
      currentPage: page,
      perPage,
      totalItems,
      totalPages: Math.ceil(totalItems / perPage),
      data: todocategorys,
    };
  }
  async findQuery(params: any) {
    console.error(params);
    const queryBuilder = this.TodocategoryRepository.createQueryBuilder('todocategory');
    if (params.hasOwnProperty('Batdau') && params.hasOwnProperty('Ketthuc')) {
      queryBuilder.andWhere('todocategory.CreateAt BETWEEN :startDate AND :endDate', {
        startDate: params.Batdau,
        endDate: params.Ketthuc,
      });
    }
    if (params.hasOwnProperty('Title')) {
      queryBuilder.andWhere('todocategory.Title LIKE :Title', { SDT: `%${params.Title}%` });
    }
    const [items, totalCount] = await queryBuilder
      .limit(params.pageSize || 10) // Set a default page size if not provided
      .offset(params.pageNumber * params.pageSize || 0)
      .getManyAndCount();
    console.log(items, totalCount);

    return { items, totalCount };
  }
  async update(id: string, UpdateTodocategoryDto: any) {
    this.TodocategoryRepository.save(UpdateTodocategoryDto);
    return await this.TodocategoryRepository.findOne({ where: { id: id } });
  }
  async remove(id: string) {
    console.error(id)
    await this.TodocategoryRepository.delete(id);
    return { deleted: true };
  }
}
