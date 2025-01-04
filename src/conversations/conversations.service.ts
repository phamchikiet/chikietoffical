import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Like, Repository } from 'typeorm';
import { ConversationEntity } from './entities/conversation.entity';
import { UsersService } from 'src/users/users.service';
@Injectable()
export class ConversationService {
  constructor(
    @InjectRepository(ConversationEntity)
    private ConversationRepository: Repository<ConversationEntity>,
    private _UsersService:UsersService
  ) { }
  async create(data: any) {
    const check = await this.findSHD(data)
    if(!check) {
      this.ConversationRepository.create(data);
      return await this.ConversationRepository.save(data);
    }
    else {
      return { error: 1001, data: "Trùng Dữ Liệu" }
    }

  }
  async findAll() {
    return await this.ConversationRepository.find({where: {isDelete: false}});
  }
  async findid(id: string) {
    return await this.ConversationRepository.findOne({ where: { id: id } });
  }
  async findSHD(data: any) {
    return await this.ConversationRepository.findOne({
      where: {
        timestamp: data.timestamp
      },
    });
  }
  async findslug(timestamp: any) {
    return await this.ConversationRepository.findOne({
      where: { timestamp: timestamp },
    });
  }
  async findPagination(page: number, perPage: number) {
    const skip = (page - 1) * perPage;
    const totalItems = await this.ConversationRepository.count();
    const conversations = await this.ConversationRepository.find({ skip, take: perPage });
    return {
      currentPage: page,
      perPage,
      totalItems,
      totalPages: Math.ceil(totalItems / perPage),
      data: conversations,
    };
  }
  async findQuery(params: any) {
    // console.error(params);
    const queryBuilder = this.ConversationRepository.createQueryBuilder('conversation');
    if (params.hasOwnProperty('Batdau') && params.hasOwnProperty('Ketthuc')) {
      queryBuilder.andWhere('conversation.CreateAt BETWEEN :startDate AND :endDate', {
        startDate: params.Batdau,
        endDate: params.Ketthuc,
      });
    }
    if (params.hasOwnProperty('Title')) {
      queryBuilder.andWhere('conversation.Title LIKE :Title', { Title: `%${params.Title}%` });
    }
    if (params.hasOwnProperty('Type')) {
      queryBuilder.andWhere('conversation.Type LIKE :Type', { Type: `${params.Type}` });
    }
    if(params.hasOwnProperty('typesearch')&& params.typesearch=="OR")
    {
      if (params.hasOwnProperty('idSender') || params.hasOwnProperty('idReceiver')) {
        queryBuilder.andWhere(
          new Brackets((qb) => {
            if (params.idSender) {
              qb.orWhere('conversation.idSender LIKE :idSender', { idSender: `${params.idSender}` });
            }
            if (params.idReceiver) {
              qb.orWhere('conversation.idReceiver LIKE :idReceiver', { idReceiver: `${params.idReceiver}` });
            }
          }),
        );
      }

    }
    else {
      if (params.hasOwnProperty('idSender')) {
        queryBuilder.andWhere('conversation.idSender LIKE :idSender', { idSender: `${params.idSender}` });
      }
      if (params.hasOwnProperty('idReceiver')) {
        queryBuilder.andWhere('conversation.idReceiver LIKE :idReceiver', { idReceiver: `${params.idReceiver}` });
      }
    }



    if (params.hasOwnProperty('idConversation')) {
      queryBuilder.andWhere('conversation.idConversation LIKE :idConversation', { idConversation: `${params.idConversation}` });
    }
    if (params.hasOwnProperty('idDelete')) {
      queryBuilder.andWhere('conversation.idDelete LIKE :idDelete', { idDelete: params.idDelete });
    }
    const [items, totalCount] = await queryBuilder
      .limit(params.pageSize || 10) // Set a default page size if not provided
      .offset(params.pageNumber * params.pageSize || 0)
      .getManyAndCount();

    const usersMap = new Map(
        (await this._UsersService.findAll()).map(user => [user.id, user])
      );  
      // Map sender and receiver directly from the usersMap
      items.forEach((item: any) => {
        item.Sender = usersMap.get(item.idSender) && (({ id, Hoten, email,Avatar }) => ({ id, Hoten, email,Avatar }))(usersMap.get(item.idSender));
        item.Receiver = usersMap.get(item.idReceiver) && (({ id, Hoten, email,Avatar }) => ({ id, Hoten, email,Avatar }))(usersMap.get(item.idReceiver));
      });    
    return { items, totalCount };
  }
  async update(id: string, UpdateConversationDto: any) {
    await this.ConversationRepository.save(UpdateConversationDto);
    return await this.ConversationRepository.findOne({ where: { id: id } });
  }
  async remove(id: string) {
    await this.ConversationRepository.delete(id);
    return { deleted: true };
  }
}
