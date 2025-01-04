import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    MessageBody,
    ConnectedSocket,
  } from '@nestjs/websockets';
  import { Server, Socket } from 'socket.io';
import { ConversationService } from './conversations.service';
  
  @WebSocketGateway({ cors: true })
  export class ConversationGateway {
    @WebSocketServer()
    server: Server;
  
    constructor(private readonly _ConversationService: ConversationService) {}
  
    @SubscribeMessage('sendMessage')
    async handleSendMessage(
      @MessageBody() data: any,
      @ConnectedSocket() client: Socket,
    ) {
      const message = await this._ConversationService.create(data);
        //console.error(message);
        console.log(data);
        this.server.to(data.idConversation).emit('receiveMessage', message);
    //   // Phát tin nhắn tới các client liên quan
    //   if (data.Type == 'private') {
    //     // Phát tới người gửi và người nhận
    //   //  const rece = this.server.to(data.idSender.toString()).emit('receiveMessage', message);
    //     this.server.to(data.idConversation).emit('receiveMessage', message);        
    //    // this.server.to(data.idReceiver?.toString() || '').emit('receiveMessage', message);
    //   } else {
    //     // Phát tới tất cả trong nhóm
    //     this.server.to(data.idConversation).emit('receiveMessage', message);
    //   }
    }
  
    @SubscribeMessage('joinChat')
    handleJoinChat(@MessageBody() idConversation: string, @ConnectedSocket() client: Socket) {
      client.join(idConversation); // Tham gia nhóm
    }
  }
  