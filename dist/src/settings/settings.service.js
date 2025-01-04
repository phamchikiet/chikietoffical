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
exports.SettingService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const setting_entity_1 = require("./entities/setting.entity");
let SettingService = class SettingService {
    constructor(SettingRepository) {
        this.SettingRepository = SettingRepository;
    }
    async create(data) {
        const check = await this.findSHD(data);
        if (!check) {
            this.SettingRepository.create(data);
            return await this.SettingRepository.save(data);
        }
        else {
            return { error: 1001, data: "Trùng Dữ Liệu" };
        }
    }
    async findAll() {
        return await this.SettingRepository.find({ where: { isDelete: false } });
    }
    async findid(id) {
        return await this.SettingRepository.findOne({ where: { id: id } });
    }
    async findSHD(data) {
        return await this.SettingRepository.findOne({
            where: {
                Title: data.Title,
                Type: data.Type
            },
        });
    }
    async findslug(slug) {
        return await this.SettingRepository.findOne({
            where: { Slug: slug },
        });
    }
    async findPagination(page, perPage) {
        const skip = (page - 1) * perPage;
        const totalItems = await this.SettingRepository.count();
        const settings = await this.SettingRepository.find({ skip, take: perPage });
        return {
            currentPage: page,
            perPage,
            totalItems,
            totalPages: Math.ceil(totalItems / perPage),
            data: settings,
        };
    }
    async findQuery(params) {
        console.error(params);
        const queryBuilder = this.SettingRepository.createQueryBuilder('setting');
        if (params.hasOwnProperty('Batdau') && params.hasOwnProperty('Ketthuc')) {
            queryBuilder.andWhere('setting.CreateAt BETWEEN :startDate AND :endDate', {
                startDate: params.Batdau,
                endDate: params.Ketthuc,
            });
        }
        if (params.hasOwnProperty('Title')) {
            queryBuilder.andWhere('setting.Title LIKE :Title', { Title: `%${params.Title}%` });
        }
        if (params.hasOwnProperty('Type')) {
            queryBuilder.andWhere('setting.Type LIKE :Type', { Type: `${params.Type}` });
        }
        if (params.hasOwnProperty('idDelete')) {
            queryBuilder.andWhere('setting.idDelete LIKE :idDelete', { idDelete: params.idDelete });
        }
        const [items, totalCount] = await queryBuilder
            .limit(params.pageSize || 10)
            .offset(params.pageNumber * params.pageSize || 0)
            .getManyAndCount();
        console.log(items, totalCount);
        return { items, totalCount };
    }
    async update(id, UpdateSettingDto) {
        await this.SettingRepository.save(UpdateSettingDto);
        return await this.SettingRepository.findOne({ where: { id: id } });
    }
    async remove(id) {
        await this.SettingRepository.delete(id);
        return { deleted: true };
    }
};
exports.SettingService = SettingService;
exports.SettingService = SettingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(setting_entity_1.SettingEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SettingService);
//# sourceMappingURL=settings.service.js.map