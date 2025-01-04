export declare class ConversationEntity {
    id: string;
    idConversation: string;
    idSender: string;
    idReceiver: string;
    message: string;
    timestamp: string;
    attachment: string;
    Type: string;
    Ordering: number;
    Status: number;
    isDelete: boolean;
    CreateAt: Date;
    UpdateAt: Date;
    DeleteAt: Date;
    idCreate: string;
    checkTitle(): void;
}
