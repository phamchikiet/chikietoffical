import { Repository } from 'typeorm';
import { CreateUsergroupDto } from './dto/create-usergroup.dto';
import { UpdateUsergroupDto } from './dto/update-usergroup.dto';
import { UsergroupEntity } from './entities/usergroup.entity';
export declare class UsergroupService {
    private UsergroupRepository;
    constructor(UsergroupRepository: Repository<UsergroupEntity>);
    create(CreateUsergroupDto: CreateUsergroupDto): Promise<CreateUsergroupDto & UsergroupEntity>;
    findAll(): Promise<UsergroupEntity[]>;
    findid(id: string): Promise<UsergroupEntity>;
    findslug(slug: any): Promise<UsergroupEntity>;
    findPagination(page: number, perPage: number): Promise<{
        currentPage: number;
        perPage: number;
        totalItems: number;
        totalPages: number;
        data: UsergroupEntity[];
    }>;
    findQuery(query: string): Promise<UsergroupEntity[]>;
    update(id: string, UpdateUsergroupDto: UpdateUsergroupDto): Promise<UsergroupEntity>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
}
