import { Repository } from 'typeorm';
import { MenuEntity } from './entities/menu.entity';
export declare class MenuService {
    private MenuRepository;
    constructor(MenuRepository: Repository<MenuEntity>);
    create(data: any): Promise<any>;
    findAll(): Promise<MenuEntity[]>;
    findid(id: string): Promise<MenuEntity>;
    findSHD(data: any): Promise<MenuEntity>;
    findslug(Title: any): Promise<MenuEntity>;
    findPagination(page: number, perPage: number): Promise<{
        currentPage: number;
        perPage: number;
        totalItems: number;
        totalPages: number;
        data: MenuEntity[];
    }>;
    findQuery(params: any): Promise<{
        items: MenuEntity[];
        totalCount: number;
    }>;
    update(id: string, UpdateMenuDto: any): Promise<MenuEntity>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
}
