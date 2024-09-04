import { TodoService } from './todo.service';
export declare class TodoController {
    private readonly todoService;
    constructor(todoService: TodoService);
    create(data: any): Promise<any>;
    findAll(): Promise<import("./entities/todo.entity").TodoEntity[]>;
    findOne(id: string): Promise<import("./entities/todo.entity").TodoEntity | {
        error: number;
        data: string;
    }>;
    findslug(slug: string): Promise<import("./entities/todo.entity").TodoEntity>;
    findQuery(SearchParams: any): Promise<{
        items: import("./entities/todo.entity").TodoEntity[];
        totalCount: number;
    }>;
    update(id: string, data: any): Promise<import("./entities/todo.entity").TodoEntity>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
}
