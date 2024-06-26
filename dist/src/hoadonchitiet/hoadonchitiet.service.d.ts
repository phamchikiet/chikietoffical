import { Repository } from 'typeorm';
import { HoadonchitietEntity } from './entities/hoadonchitiet.entity';
export declare class HoadonchitietService {
    private HoadonchitietRepository;
    constructor(HoadonchitietRepository: Repository<HoadonchitietEntity>);
    create(data: any): Promise<any>;
    findAll(): Promise<HoadonchitietEntity[]>;
    findid(id: string): Promise<HoadonchitietEntity>;
    findSHD(data: any): Promise<HoadonchitietEntity>;
    findslug(Title: any): Promise<HoadonchitietEntity>;
    findPagination(page: number, perPage: number): Promise<{
        currentPage: number;
        perPage: number;
        totalItems: number;
        totalPages: number;
        data: HoadonchitietEntity[];
    }>;
    findQuery(params: any): Promise<{
        items: HoadonchitietEntity[];
        totalCount: number;
    }>;
    update(id: string, UpdateHoadonchitietDto: any): Promise<HoadonchitietEntity>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
}
