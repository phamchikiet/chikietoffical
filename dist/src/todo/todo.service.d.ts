import { Repository } from 'typeorm';
import { TodoEntity } from './entities/todo.entity';
export declare class TodoService {
    private TodoRepository;
    constructor(TodoRepository: Repository<TodoEntity>);
    create(data: any): Promise<any>;
    findAll(): Promise<TodoEntity[]>;
    findid(id: string): Promise<TodoEntity | {
        error: number;
        data: string;
    }>;
    findSHD(data: any): Promise<TodoEntity>;
    findslug(Title: any): Promise<TodoEntity>;
    findPagination(page: number, perPage: number): Promise<{
        currentPage: number;
        perPage: number;
        totalItems: number;
        totalPages: number;
        data: TodoEntity[];
    }>;
    findQuery(params: any): Promise<{
        items: any;
        totalCount: number;
    }>;
    update(id: string, UpdateTodoDto: any): Promise<TodoEntity>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
}
