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
exports.HighlightService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const highlight_entity_1 = require("./entities/highlight.entity");
let HighlightService = class HighlightService {
    constructor(HighlightRepository) {
        this.HighlightRepository = HighlightRepository;
    }
    async create(data) {
        const check = await this.findSHD(data);
        if (!check) {
            this.HighlightRepository.create(data);
            return await this.HighlightRepository.save(data);
        }
        else {
            return { error: 1001, data: "Trùng Dữ Liệu" };
        }
    }
    async findAll() {
        return await this.HighlightRepository.find({ where: { isDelete: false } });
    }
    async findid(id) {
        return await this.HighlightRepository.findOne({ where: { id: id } });
    }
    async findSHD(data) {
        return await this.HighlightRepository.findOne({
            where: {
                Title: data.Title,
                Slug: data.Slug
            },
        });
    }
    async findslug(Title) {
        return await this.HighlightRepository.findOne({
            where: { Title: Title },
        });
    }
    async findPagination(page, perPage) {
        const skip = (page - 1) * perPage;
        const totalItems = await this.HighlightRepository.count();
        const highlights = await this.HighlightRepository.find({ skip, take: perPage });
        return {
            currentPage: page,
            perPage,
            totalItems,
            totalPages: Math.ceil(totalItems / perPage),
            data: highlights,
        };
    }
    async findQuery(params) {
        console.error(params);
        const queryBuilder = this.HighlightRepository.createQueryBuilder('highlight');
        if (params.hasOwnProperty('Batdau') && params.hasOwnProperty('Ketthuc')) {
            queryBuilder.andWhere('highlight.CreateAt BETWEEN :startDate AND :endDate', {
                startDate: params.Batdau,
                endDate: params.Ketthuc,
            });
        }
        if (params.hasOwnProperty('Title')) {
            queryBuilder.andWhere('highlight.Title LIKE :Title', { Title: `%${params.Title}%` });
        }
        if (params.hasOwnProperty('Type')) {
            queryBuilder.andWhere('highlight.Type LIKE :Type', { Type: `%${params.Type}%` });
        }
        if (params.hasOwnProperty('idDM')) {
            queryBuilder.andWhere('highlight.idDM LIKE :idDM', { idDM: `${params.idDM}` });
        }
        if (params.hasOwnProperty('idDelete')) {
            queryBuilder.andWhere('highlight.idDelete LIKE :idDelete', { idDelete: params.idDelete });
        }
        const [items, totalCount] = await queryBuilder
            .limit(params.pageSize || 10)
            .offset(params.pageNumber * params.pageSize || 0)
            .getManyAndCount();
        return { items, totalCount };
    }
    async update(id, UpdateHighlightDto) {
        await this.HighlightRepository.save(UpdateHighlightDto);
        return await this.HighlightRepository.findOne({ where: { id: id } });
    }
    async remove(id) {
        await this.HighlightRepository.delete(id);
        return { deleted: true };
    }
};
exports.HighlightService = HighlightService;
exports.HighlightService = HighlightService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(highlight_entity_1.HighlightEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], HighlightService);
//# sourceMappingURL=highlight.service.js.map