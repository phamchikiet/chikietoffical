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
exports.UsergroupService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const usergroup_entity_1 = require("./entities/usergroup.entity");
let UsergroupService = class UsergroupService {
    constructor(UsergroupRepository) {
        this.UsergroupRepository = UsergroupRepository;
    }
    async create(CreateUsergroupDto) {
        this.UsergroupRepository.create(CreateUsergroupDto);
        return await this.UsergroupRepository.save(CreateUsergroupDto);
    }
    async findAll() {
        return await this.UsergroupRepository.find();
    }
    async findid(id) {
        return await this.UsergroupRepository.findOne({
            where: { id: id },
        });
    }
    async findslug(slug) {
        return await this.UsergroupRepository.findOne({
            where: { Slug: slug },
        });
    }
    async findPagination(page, perPage) {
        const skip = (page - 1) * perPage;
        const totalItems = await this.UsergroupRepository.count();
        const usergroups = await this.UsergroupRepository.find({ skip, take: perPage });
        return {
            currentPage: page,
            perPage,
            totalItems,
            totalPages: Math.ceil(totalItems / perPage),
            data: usergroups,
        };
    }
    async findQuery(query) {
        return await this.UsergroupRepository.find({
            where: { Title: (0, typeorm_2.Like)(`%query%`) },
        });
    }
    async update(id, UpdateUsergroupDto) {
        this.UsergroupRepository.save(UpdateUsergroupDto);
        return await this.UsergroupRepository.findOne({ where: { id: id } });
    }
    async remove(id) {
        console.error(id);
        await this.UsergroupRepository.delete(id);
        return { deleted: true };
    }
};
exports.UsergroupService = UsergroupService;
exports.UsergroupService = UsergroupService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(usergroup_entity_1.UsergroupEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsergroupService);
//# sourceMappingURL=usergroup.service.js.map