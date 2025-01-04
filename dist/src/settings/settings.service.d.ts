import { Repository } from 'typeorm';
import { SettingEntity } from './entities/setting.entity';
export declare class SettingService {
    private SettingRepository;
    constructor(SettingRepository: Repository<SettingEntity>);
    create(data: any): Promise<any>;
    findAll(): Promise<SettingEntity[]>;
    findid(id: string): Promise<SettingEntity>;
    findSHD(data: any): Promise<SettingEntity>;
    findslug(slug: any): Promise<SettingEntity>;
    findPagination(page: number, perPage: number): Promise<{
        currentPage: number;
        perPage: number;
        totalItems: number;
        totalPages: number;
        data: SettingEntity[];
    }>;
    findQuery(params: any): Promise<{
        items: SettingEntity[];
        totalCount: number;
    }>;
    update(id: string, UpdateSettingDto: any): Promise<SettingEntity>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
}
