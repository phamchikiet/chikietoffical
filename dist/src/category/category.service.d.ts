import { Repository } from 'typeorm';
import { CategoryEntity } from './entities/category.entity';
export declare class CategoryService {
    private CategoryRepository;
    constructor(CategoryRepository: Repository<CategoryEntity>);
    create(data: any): Promise<any>;
    findAll(): Promise<CategoryEntity[]>;
    findid(id: string): Promise<CategoryEntity>;
    findSHD(data: any): Promise<CategoryEntity>;
    findslug(Title: any): Promise<CategoryEntity>;
    findPagination(page: number, perPage: number): Promise<{
        currentPage: number;
        perPage: number;
        totalItems: number;
        totalPages: number;
        data: CategoryEntity[];
    }>;
    findQuery(params: any): Promise<{
        items: CategoryEntity[];
        totalCount: number;
    }>;
    update(id: string, UpdateCategoryDto: any): Promise<CategoryEntity>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
}
