import { TodocategoryService } from './todocategory.service';
export declare class TodocategoryController {
    private readonly todocategoryService;
    constructor(todocategoryService: TodocategoryService);
    create(data: any): Promise<any>;
    findAll(): Promise<import("./entities/todocategory.entity").TodocategoryEntity[]>;
    findOne(id: string): Promise<import("./entities/todocategory.entity").TodocategoryEntity>;
    findslug(slug: string): Promise<import("./entities/todocategory.entity").TodocategoryEntity>;
    findQuery(SearchParams: any): Promise<{
        items: import("./entities/todocategory.entity").TodocategoryEntity[];
        totalCount: number;
    }>;
    update(id: string, data: any): Promise<import("./entities/todocategory.entity").TodocategoryEntity>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
}
