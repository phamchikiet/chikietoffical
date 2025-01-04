import { Repository } from 'typeorm';
import { UploadEntity } from './entities/upload.entity';
export declare class UploadService {
    private UploadRepository;
    constructor(UploadRepository: Repository<UploadEntity>);
    create(data: any): Promise<any>;
    findAll(): Promise<UploadEntity[]>;
    findid(id: string): Promise<UploadEntity | {
        error: number;
        data: string;
    }>;
    findSHD(data: any): Promise<UploadEntity>;
    findslug(Title: any): Promise<UploadEntity>;
    findPagination(page: number, perPage: number): Promise<{
        currentPage: number;
        perPage: number;
        totalItems: number;
        totalPages: number;
        data: UploadEntity[];
    }>;
    findQuery(params: any): Promise<{
        items: any;
        totalCount: number;
    }>;
    update(id: string, UpdateUploadDto: any): Promise<UploadEntity>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
}
