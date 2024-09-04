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
exports.TodoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const todo_entity_1 = require("./entities/todo.entity");
let TodoService = class TodoService {
    constructor(TodoRepository) {
        this.TodoRepository = TodoRepository;
    }
    async create(data) {
        const check = await this.findSHD(data);
        if (!check) {
            this.TodoRepository.create(data);
            return await this.TodoRepository.save(data);
        }
        else {
            return { error: 1001, data: "Trùng Dữ Liệu" };
        }
    }
    async findAll() {
        return await this.TodoRepository.find();
    }
    async findid(id) {
        const result = await this.TodoRepository.findOne({ where: { id: id } });
        if (result) {
            return result;
        }
        else {
            return { error: 1001, data: "Không Tồn Tại" };
        }
    }
    async findSHD(data) {
        return await this.TodoRepository.findOne({
            where: {
                Title: data.Title,
                Type: data.Type
            },
        });
    }
    async findslug(Title) {
        return await this.TodoRepository.findOne({
            where: { Title: Title },
        });
    }
    async findPagination(page, perPage) {
        const skip = (page - 1) * perPage;
        const totalItems = await this.TodoRepository.count();
        const todos = await this.TodoRepository.find({ skip, take: perPage });
        return {
            currentPage: page,
            perPage,
            totalItems,
            totalPages: Math.ceil(totalItems / perPage),
            data: todos,
        };
    }
    async findQuery(params) {
        console.error(params);
        const queryBuilder = this.TodoRepository.createQueryBuilder('todo');
        if (params.hasOwnProperty('Batdau') && params.hasOwnProperty('Ketthuc')) {
            queryBuilder.andWhere('todo.CreateAt BETWEEN :startDate AND :endDate', {
                startDate: params.Batdau,
                endDate: params.Ketthuc,
            });
        }
        if (params.hasOwnProperty('Title')) {
            queryBuilder.andWhere('todo.Title LIKE :Title', { SDT: `%${params.Title}%` });
        }
        if (params.hasOwnProperty('idUser')) {
            queryBuilder.andWhere('user.idUser = :idUser', { idUser: params.idUser })
                .orWhere('user.idUser::text ILIKE :idUser', { idUser: `%${params.idUser}%` });
        }
        const [items, totalCount] = await queryBuilder
            .limit(params.pageSize || 10)
            .offset(params.pageNumber * params.pageSize || 0)
            .getManyAndCount();
        return { items, totalCount };
    }
    async update(id, UpdateTodoDto) {
        this.TodoRepository.save(UpdateTodoDto);
        return await this.TodoRepository.findOne({ where: { id: id } });
    }
    async remove(id) {
        console.error(id);
        await this.TodoRepository.delete(id);
        return { deleted: true };
    }
};
exports.TodoService = TodoService;
exports.TodoService = TodoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(todo_entity_1.TodoEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TodoService);
//# sourceMappingURL=todo.service.js.map