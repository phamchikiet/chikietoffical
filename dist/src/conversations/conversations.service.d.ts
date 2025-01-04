import { Repository } from 'typeorm';
import { ConversationEntity } from './entities/conversation.entity';
import { UsersService } from 'src/users/users.service';
export declare class ConversationService {
    private ConversationRepository;
    private _UsersService;
    constructor(ConversationRepository: Repository<ConversationEntity>, _UsersService: UsersService);
    create(data: any): Promise<any>;
    findAll(): Promise<ConversationEntity[]>;
    findid(id: string): Promise<ConversationEntity>;
    findSHD(data: any): Promise<ConversationEntity>;
    findslug(timestamp: any): Promise<ConversationEntity>;
    findPagination(page: number, perPage: number): Promise<{
        currentPage: number;
        perPage: number;
        totalItems: number;
        totalPages: number;
        data: ConversationEntity[];
    }>;
    findQuery(params: any): Promise<{
        items: ConversationEntity[];
        totalCount: number;
    }>;
    update(id: string, UpdateConversationDto: any): Promise<ConversationEntity>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
}
