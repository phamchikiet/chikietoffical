import { Module } from '@nestjs/common';
import { ConversationService } from './conversations.service';
import { ConversationController } from './conversations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConversationEntity } from './entities/conversation.entity';
import { ConversationGateway } from './conversation.gateway';
import { UsersModule } from 'src/users/users.module';
@Module({
  imports: [
  TypeOrmModule.forFeature([ConversationEntity]), 
  ConversationModule,
  UsersModule
],
  controllers: [ConversationController],
  providers: [ConversationGateway,ConversationService]
})
export class ConversationModule {}



