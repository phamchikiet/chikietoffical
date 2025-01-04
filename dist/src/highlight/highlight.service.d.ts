import { Repository } from 'typeorm';
import { HighlightEntity } from './entities/highlight.entity';
export declare class HighlightService {
    private HighlightRepository;
    constructor(HighlightRepository: Repository<HighlightEntity>);
    create(data: any): Promise<any>;
    findAll(): Promise<HighlightEntity[]>;
    findid(id: string): Promise<HighlightEntity>;
    findSHD(data: any): Promise<HighlightEntity>;
    findslug(Title: any): Promise<HighlightEntity>;
    findPagination(page: number, perPage: number): Promise<{
        currentPage: number;
        perPage: number;
        totalItems: number;
        totalPages: number;
        data: HighlightEntity[];
    }>;
    findQuery(params: any): Promise<{
        items: HighlightEntity[];
        totalCount: number;
    }>;
    update(id: string, UpdateHighlightDto: any): Promise<HighlightEntity>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
}
