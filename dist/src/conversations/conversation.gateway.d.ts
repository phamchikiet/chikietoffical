import { Server, Socket } from 'socket.io';
import { ConversationService } from './conversations.service';
export declare class ConversationGateway {
    private readonly _ConversationService;
    server: Server;
    constructor(_ConversationService: ConversationService);
    handleSendMessage(data: any, client: Socket): Promise<void>;
    handleJoinChat(idConversation: string, client: Socket): void;
}
