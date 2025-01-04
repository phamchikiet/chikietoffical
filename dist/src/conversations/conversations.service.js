"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const conversation_entity_1 = require("./entities/conversation.entity");
const users_service_1 = require("../users/users.service");
let ConversationService = class ConversationService {
    constructor(ConversationRepository, _UsersService) {
        this.ConversationRepository = ConversationRepository;
        this._UsersService = _UsersService;
    }
    async create(data) {
        const check = await this.findSHD(data);
        if (!check) {
            this.ConversationRepository.create(data);
            return await this.ConversationRepository.save(data);
        }
        else {
            return { error: 1001, data: "Trùng Dữ Liệu" };
        }
    }
    async findAll() {
        return await this.ConversationRepository.find({ where: { isDelete: false } });
    }
    async findid(id) {
        return await this.ConversationRepository.findOne({ where: { id: id } });
    }
    async findSHD(data) {
        return await this.ConversationRepository.findOne({
            where: {
                timestamp: data.timestamp
            },
        });
    }
    async findslug(timestamp) {
        return await this.ConversationRepository.findOne({
            where: { timestamp: timestamp },
        });
    }
    async findPagination(page, perPage) {
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
    async findQuery(params) {
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
        if (params.hasOwnProperty('typesearch') && params.typesearch == "OR") {
            if (params.hasOwnProperty('idSender') || params.hasOwnProperty('idReceiver')) {
                queryBuilder.andWhere(new typeorm_2.Brackets((qb) => {
                    if (params.idSender) {
                        qb.orWhere('conversation.idSender LIKE :idSender', { idSender: `${params.idSender}` });
                    }
                    if (params.idReceiver) {
                        qb.orWhere('conversation.idReceiver LIKE :idReceiver', { idReceiver: `${params.idReceiver}` });
                    }
                }));
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
            .limit(params.pageSize || 10)
            .offset(params.pageNumber * params.pageSize || 0)
            .getManyAndCount();
        const usersMap = new Map((await this._UsersService.findAll()).map(user => [user.id, user]));
        items.forEach((item) => {
            item.Sender = usersMap.get(item.idSender) && (({ id, Hoten, email, Avatar }) => ({ id, Hoten, email, Avatar }))(usersMap.get(item.idSender));
            item.Receiver = usersMap.get(item.idReceiver) && (({ id, Hoten, email, Avatar }) => ({ id, Hoten, email, Avatar }))(usersMap.get(item.idReceiver));
        });
        return { items, totalCount };
    }
    async update(id, UpdateConversationDto) {
        await this.ConversationRepository.save(UpdateConversationDto);
        return await this.ConversationRepository.findOne({ where: { id: id } });
    }
    async remove(id) {
        await this.ConversationRepository.delete(id);
        return { deleted: true };
    }
};
exports.ConversationService = ConversationService;
exports.ConversationService = ConversationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(conversation_entity_1.ConversationEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        users_service_1.UsersService])
], ConversationService);
//# sourceMappingURL=conversations.service.js.map