import { AclService } from './acl.service';
import { CreateAclDto } from './dto/create-acl.dto';
import { UpdateAclDto } from './dto/update-acl.dto';
export declare class AclController {
    private readonly aclService;
    constructor(aclService: AclService);
    create(createAclDto: CreateAclDto): Promise<CreateAclDto & import("./entities/acl.entity").AclEntity>;
    findAll(): Promise<import("./entities/acl.entity").AclEntity[]>;
    findOne(id: string): Promise<import("./entities/acl.entity").AclEntity>;
    findslug(slug: string): Promise<import("./entities/acl.entity").AclEntity>;
    findPagination(page: number, perPage: number): Promise<{
        currentPage: number;
        perPage: number;
        totalItems: number;
        totalPages: number;
        data: import("./entities/acl.entity").AclEntity[];
    }>;
    findQuery(query: string): Promise<import("./entities/acl.entity").AclEntity[]>;
    update(id: string, updateAclDto: UpdateAclDto): Promise<import("./entities/acl.entity").AclEntity>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
}
