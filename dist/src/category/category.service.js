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
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const category_entity_1 = require("./entities/category.entity");
let CategoryService = class CategoryService {
    constructor(CategoryRepository) {
        this.CategoryRepository = CategoryRepository;
    }
    async create(data) {
        const check = await this.findSHD(data);
        if (!check) {
            this.CategoryRepository.create(data);
            return await this.CategoryRepository.save(data);
        }
        else {
            return { error: 1001, data: "Trùng Dữ Liệu" };
        }
    }
    async findAll() {
        return await this.CategoryRepository.find({ where: { isDelete: false } });
    }
    async findid(id) {
        return await this.CategoryRepository.findOne({ where: { id: id } });
    }
    async findSHD(data) {
        return await this.CategoryRepository.findOne({
            where: {
                Title: data.Title,
                Type: data.Type
            },
        });
    }
    async findslug(Title) {
        return await this.CategoryRepository.findOne({
            where: { Title: Title },
        });
    }
    async findPagination(page, perPage) {
        const skip = (page - 1) * perPage;
        const totalItems = await this.CategoryRepository.count();
        const categorys = await this.CategoryRepository.find({ skip, take: perPage });
        return {
            currentPage: page,
            perPage,
            totalItems,
            totalPages: Math.ceil(totalItems / perPage),
            data: categorys,
        };
    }
    async findQuery(params) {
        console.error(params);
        const queryBuilder = this.CategoryRepository.createQueryBuilder('category');
        if (params.hasOwnProperty('Batdau') && params.hasOwnProperty('Ketthuc')) {
            queryBuilder.andWhere('category.CreateAt BETWEEN :startDate AND :endDate', {
                startDate: params.Batdau,
                endDate: params.Ketthuc,
            });
        }
        if (params.hasOwnProperty('Title')) {
            queryBuilder.andWhere('category.Title LIKE :Title', { Title: `%${params.Title}%` });
        }
        if (params.hasOwnProperty('idDelete')) {
            queryBuilder.andWhere('category.idDelete LIKE :idDelete', { idDelete: params.idDelete });
        }
        const [items, totalCount] = await queryBuilder
            .limit(params.pageSize || 10)
            .offset(params.pageNumber * params.pageSize || 0)
            .getManyAndCount();
        console.log(items, totalCount);
        return { items, totalCount };
    }
    async update(id, UpdateCategoryDto) {
        await this.CategoryRepository.save(UpdateCategoryDto);
        return await this.CategoryRepository.findOne({ where: { id: id } });
    }
    async remove(id) {
        await this.CategoryRepository.delete(id);
        return { deleted: true };
    }
};
exports.CategoryService = CategoryService;
exports.CategoryService = CategoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(category_entity_1.CategoryEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CategoryService);
//# sourceMappingURL=category.service.js.map