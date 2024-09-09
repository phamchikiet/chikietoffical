import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { TodoEntity } from './entities/todo.entity';
@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private TodoRepository: Repository<TodoEntity>
  ) { }
  async create(data: any) {
    const check = await this.findSHD(data)
    if(!check) {
      this.TodoRepository.create(data);
      return await this.TodoRepository.save(data);
    }
    else {
      return { error: 1001, data: "Trùng Dữ Liệu" }
    }

  }

  async findAll() {
    return await this.TodoRepository.find();
  }
  async findid(id: string) {
    const result = await this.TodoRepository.findOne({ where: { id: id } });
    if(result) {
      return result
    }
    else {
      return {error: 1001, data: "Không Tồn Tại"}
    }
  }
  async findSHD(data: any) {
    return await this.TodoRepository.findOne({
      where: {
        Title: data.Title,
        Type: data.Type
      },
    });
  }
  async findslug(Title: any) {
    return await this.TodoRepository.findOne({
      where: { Title: Title },
    });
  }
  async findPagination(page: number, perPage: number) {
    const skip = (page - 1) * perPage;
    const totalItems = await this.TodoRepository.count();
    const todos = await this.TodoRepository.find({ skip, take: perPage });
    return {
      currentPage: page,
      perPage,
      totalItems,
      totalPages: Math.ceil(totalItems / perPage),
      data: todos,
    };
  }
  async findQuery(params: any) {
   // console.error(params);
    const queryBuilder = this.TodoRepository.createQueryBuilder('todo');
    if (params.hasOwnProperty('Batdau') && params.hasOwnProperty('Ketthuc')) {
      queryBuilder.andWhere('todo.CreateAt BETWEEN :startDate AND :endDate', {
        startDate: params.Batdau,
        endDate: params.Ketthuc,
      });
    }
    if (params.hasOwnProperty('Title')) {
      queryBuilder.andWhere('todo.Title LIKE :Title', { SDT: `%${params.Title}%` });
    }
    if (params.hasOwnProperty('idDM')) {
      queryBuilder.andWhere('todo.idDM LIKE :idDM', { idDM: params.idDM });
    }
    if (params.hasOwnProperty('idDelete')) {
      queryBuilder.andWhere('todo.idDelete LIKE :idDelete', { idDelete: params.idDelete });
    }
    if (params.hasOwnProperty('idUser')) {
      queryBuilder.andWhere('user.idUser = :idUser', { idUser: params.idUser })
      .orWhere('user.idUser::text ILIKE :idUser', { idUser: `%${params.idUser}%` });
    }
    const [items, totalCount] = await queryBuilder
      .limit(params.pageSize || 10) // Set a default page size if not provided
      .offset(params.pageNumber * params.pageSize || 0)
      .getManyAndCount();      
    return { items, totalCount };
  }
  async update(id: string, UpdateTodoDto: any) {
    this.TodoRepository.save(UpdateTodoDto);
    return await this.TodoRepository.findOne({ where: { id: id } });
  }
  async remove(id: string) {
    console.error(id)
    await this.TodoRepository.delete(id);
    return { deleted: true };
  }
}
