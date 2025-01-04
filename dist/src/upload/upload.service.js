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
exports.UploadService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const upload_entity_1 = require("./entities/upload.entity");
let UploadService = class UploadService {
    constructor(UploadRepository) {
        this.UploadRepository = UploadRepository;
    }
    async create(data) {
        const check = await this.findSHD(data);
        if (!check) {
            this.UploadRepository.create(data);
            return await this.UploadRepository.save(data);
        }
        else {
            return { error: 1001, data: 'Trùng Dữ Liệu' };
        }
    }
    async findAll() {
        const result = await this.UploadRepository.find();
        return result;
    }
    async findid(id) {
        const result = await this.UploadRepository.findOne({ where: { id: id } });
        if (result) {
            return result;
        }
        else {
            return { error: 1001, data: 'Không Tồn Tại' };
        }
    }
    async findSHD(data) {
        return await this.UploadRepository.findOne({
            where: {
                fileid: data.fileId,
            },
        });
    }
    async findslug(Title) {
        return await this.UploadRepository.findOne({
            where: { Title: Title },
        });
    }
    async findPagination(page, perPage) {
        const skip = (page - 1) * perPage;
        const totalItems = await this.UploadRepository.count();
        const uploads = await this.UploadRepository.find({ skip, take: perPage });
        return {
            currentPage: page,
            perPage,
            totalItems,
            totalPages: Math.ceil(totalItems / perPage),
            data: uploads,
        };
    }
    async findQuery(params) {
        const queryBuilder = this.UploadRepository.createQueryBuilder('upload');
        if (params.hasOwnProperty('Batdau') && params.hasOwnProperty('Ketthuc')) {
            queryBuilder.andWhere('upload.CreateAt BETWEEN :startDate AND :endDate', {
                startDate: params.Batdau,
                endDate: params.Ketthuc,
            });
        }
        if (params.hasOwnProperty('Title')) {
            queryBuilder.andWhere('upload.Title LIKE :Title', {
                SDT: `%${params.Title}%`,
            });
        }
        if (params.hasOwnProperty('idDM')) {
            queryBuilder.andWhere('upload.idDM LIKE :idDM', { idDM: params.idDM });
        }
        if (params.hasOwnProperty('isDelete')) {
            queryBuilder.andWhere('upload.isDelete LIKE :isDelete', {
                isDelete: params.isDelete,
            });
        }
        const [result, totalCount] = await queryBuilder
            .limit(params.pageSize || 10)
            .offset(params.pageNumber * params.pageSize || 0)
            .getManyAndCount();
        let items = [];
        if (params.hasOwnProperty('idUser')) {
            items = result.filter((v) => v.idUser.some((v1) => v1.idUser == params.idUser));
        }
        else {
            items = result;
        }
        return { items, totalCount };
    }
    async update(id, UpdateUploadDto) {
        await this.UploadRepository.save(UpdateUploadDto);
        return await this.UploadRepository.findOne({ where: { id: id } });
    }
    async remove(id) {
        console.error(id);
        await this.UploadRepository.delete(id);
        return { deleted: true };
    }
};
exports.UploadService = UploadService;
exports.UploadService = UploadService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(upload_entity_1.UploadEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UploadService);
//# sourceMappingURL=upload.service.js.map