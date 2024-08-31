import { CategoryService } from './category.service';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    create(data: any): Promise<any>;
    findAll(): Promise<import("./entities/category.entity").CategoryEntity[]>;
    findOne(id: string): Promise<import("./entities/category.entity").CategoryEntity>;
    findslug(slug: string): Promise<import("./entities/category.entity").CategoryEntity>;
    findQuery(SearchParams: any): Promise<{
        items: import("./entities/category.entity").CategoryEntity[];
        totalCount: number;
    }>;
    update(id: string, data: any): Promise<import("./entities/category.entity").CategoryEntity>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
}
