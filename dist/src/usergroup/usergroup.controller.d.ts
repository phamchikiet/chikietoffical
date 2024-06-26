import { UsergroupService } from './usergroup.service';
import { CreateUsergroupDto } from './dto/create-usergroup.dto';
import { UpdateUsergroupDto } from './dto/update-usergroup.dto';
export declare class UsergroupController {
    private readonly usergroupService;
    constructor(usergroupService: UsergroupService);
    create(createUsergroupDto: CreateUsergroupDto): Promise<CreateUsergroupDto & import("./entities/usergroup.entity").UsergroupEntity>;
    findAll(): Promise<import("./entities/usergroup.entity").UsergroupEntity[]>;
    findOne(id: string): Promise<import("./entities/usergroup.entity").UsergroupEntity>;
    findslug(slug: string): Promise<import("./entities/usergroup.entity").UsergroupEntity>;
    findPagination(page: number, perPage: number): Promise<{
        currentPage: number;
        perPage: number;
        totalItems: number;
        totalPages: number;
        data: import("./entities/usergroup.entity").UsergroupEntity[];
    }>;
    findQuery(query: string): Promise<import("./entities/usergroup.entity").UsergroupEntity[]>;
    update(id: string, updateUsergroupDto: UpdateUsergroupDto): Promise<import("./entities/usergroup.entity").UsergroupEntity>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
}
