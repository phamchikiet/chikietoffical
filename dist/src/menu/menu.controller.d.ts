import { MenuService } from './menu.service';
export declare class MenuController {
    private readonly menuService;
    constructor(menuService: MenuService);
    create(data: any): Promise<any>;
    findAll(): Promise<import("./entities/menu.entity").MenuEntity[]>;
    findOne(id: string): Promise<import("./entities/menu.entity").MenuEntity>;
    findslug(slug: string): Promise<import("./entities/menu.entity").MenuEntity>;
    findQuery(SearchParams: any): Promise<{
        items: import("./entities/menu.entity").MenuEntity[];
        totalCount: number;
    }>;
    update(id: string, data: any): Promise<import("./entities/menu.entity").MenuEntity>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
}
