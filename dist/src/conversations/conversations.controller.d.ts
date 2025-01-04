import { ConversationService } from './conversations.service';
export declare class ConversationController {
    private readonly conversationService;
    constructor(conversationService: ConversationService);
    create(data: any): Promise<any>;
    findAll(): Promise<import("./entities/conversation.entity").ConversationEntity[]>;
    findOne(id: string): Promise<import("./entities/conversation.entity").ConversationEntity>;
    findslug(slug: string): Promise<import("./entities/conversation.entity").ConversationEntity>;
    findQuery(SearchParams: any): Promise<{
        items: import("./entities/conversation.entity").ConversationEntity[];
        totalCount: number;
    }>;
    update(id: string, data: any): Promise<import("./entities/conversation.entity").ConversationEntity>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
}
