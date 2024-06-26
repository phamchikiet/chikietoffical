import { HoadonchitietService } from './hoadonchitiet.service';
export declare class HoadonchitietController {
    private readonly hoadonchitietService;
    constructor(hoadonchitietService: HoadonchitietService);
    create(data: any): Promise<any>;
    findAll(): Promise<import("./entities/hoadonchitiet.entity").HoadonchitietEntity[]>;
    findOne(id: string): Promise<import("./entities/hoadonchitiet.entity").HoadonchitietEntity>;
    findslug(slug: string): Promise<import("./entities/hoadonchitiet.entity").HoadonchitietEntity>;
    findQuery(SearchParams: any): Promise<{
        items: import("./entities/hoadonchitiet.entity").HoadonchitietEntity[];
        totalCount: number;
    }>;
    update(id: string, data: any): Promise<import("./entities/hoadonchitiet.entity").HoadonchitietEntity>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
}
