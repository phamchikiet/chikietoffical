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
exports.HoadonchitietService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const hoadonchitiet_entity_1 = require("./entities/hoadonchitiet.entity");
let HoadonchitietService = class HoadonchitietService {
    constructor(HoadonchitietRepository) {
        this.HoadonchitietRepository = HoadonchitietRepository;
    }
    async create(data) {
        const check = await this.findSHD(data);
        if (!check) {
            this.HoadonchitietRepository.create(data);
            return await this.HoadonchitietRepository.save(data);
        }
        else {
            return { error: 1001, data: "Trùng Dữ Liệu" };
        }
    }
    async findAll() {
        return await this.HoadonchitietRepository.find();
    }
    async findid(id) {
        return await this.HoadonchitietRepository.findOne({ where: { id: id } });
    }
    async findSHD(data) {
        return await this.HoadonchitietRepository.findOne({
            where: {
                nbmst: data.nbmst,
                khmshdon: data.khmshdon,
                khhdon: data.khhdon,
                shdon: data.shdon
            },
        });
    }
    async findslug(Title) {
        return await this.HoadonchitietRepository.findOne({
            where: { shdon: Title },
        });
    }
    async findPagination(page, perPage) {
        const skip = (page - 1) * perPage;
        const totalItems = await this.HoadonchitietRepository.count();
        const hoadonchitiets = await this.HoadonchitietRepository.find({ skip, take: perPage });
        return {
            currentPage: page,
            perPage,
            totalItems,
            totalPages: Math.ceil(totalItems / perPage),
            data: hoadonchitiets,
        };
    }
    async findQuery(params) {
        console.error(params);
        const queryBuilder = this.HoadonchitietRepository.createQueryBuilder('hoadonchitiet');
        if (params.Batdau && params.Ketthuc) {
            queryBuilder.andWhere('hoadonchitiet.CreateAt BETWEEN :startDate AND :endDate', {
                startDate: params.Batdau,
                endDate: params.Ketthuc,
            });
        }
        if (params.Title) {
            queryBuilder.andWhere('hoadonchitiet.Title LIKE :Title', { SDT: `%${params.Title}%` });
        }
        if (params.thlap) {
            queryBuilder.andWhere('hoadonchitiet.thlap LIKE :thlap', { thlap: `${params.thlap}` });
        }
        const [items, totalCount] = await queryBuilder
            .limit(params.pageSize || 10)
            .offset(params.pageNumber * params.pageSize || 0)
            .getManyAndCount();
        console.log(items, totalCount);
        return { items, totalCount };
    }
    async update(id, UpdateHoadonchitietDto) {
        this.HoadonchitietRepository.save(UpdateHoadonchitietDto);
        return await this.HoadonchitietRepository.findOne({ where: { id: id } });
    }
    async remove(id) {
        console.error(id);
        await this.HoadonchitietRepository.delete(id);
        return { deleted: true };
    }
};
exports.HoadonchitietService = HoadonchitietService;
exports.HoadonchitietService = HoadonchitietService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(hoadonchitiet_entity_1.HoadonchitietEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], HoadonchitietService);
//# sourceMappingURL=hoadonchitiet.service.js.map