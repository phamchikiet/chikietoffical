import { Repository } from 'typeorm';
import { CreateAclDto } from './dto/create-acl.dto';
import { UpdateAclDto } from './dto/update-acl.dto';
import { AclEntity } from './entities/acl.entity';
export declare class AclService {
    private AclRepository;
    constructor(AclRepository: Repository<AclEntity>);
    create(CreateAclDto: CreateAclDto): Promise<CreateAclDto & AclEntity>;
    findAll(): Promise<AclEntity[]>;
    findid(id: string): Promise<AclEntity>;
    findslug(slug: any): Promise<AclEntity>;
    findPagination(page: number, perPage: number): Promise<{
        currentPage: number;
        perPage: number;
        totalItems: number;
        totalPages: number;
        data: AclEntity[];
    }>;
    findQuery(query: string): Promise<AclEntity[]>;
    update(id: string, UpdateAclDto: UpdateAclDto): Promise<AclEntity>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
}
