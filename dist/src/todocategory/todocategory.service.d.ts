import { Repository } from 'typeorm';
import { TodocategoryEntity } from './entities/todocategory.entity';
export declare class TodocategoryService {
    private TodocategoryRepository;
    constructor(TodocategoryRepository: Repository<TodocategoryEntity>);
    create(data: any): Promise<any>;
    findAll(): Promise<TodocategoryEntity[]>;
    findid(id: string): Promise<TodocategoryEntity>;
    findSHD(data: any): Promise<TodocategoryEntity>;
    findslug(Title: any): Promise<TodocategoryEntity>;
    findPagination(page: number, perPage: number): Promise<{
        currentPage: number;
        perPage: number;
        totalItems: number;
        totalPages: number;
        data: TodocategoryEntity[];
    }>;
    findQuery(params: any): Promise<{
        items: TodocategoryEntity[];
        totalCount: number;
    }>;
    update(id: string, UpdateTodocategoryDto: any): Promise<TodocategoryEntity>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
}
