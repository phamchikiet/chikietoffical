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
exports.AclController = void 0;
const common_1 = require("@nestjs/common");
const acl_service_1 = require("./acl.service");
const create_acl_dto_1 = require("./dto/create-acl.dto");
const update_acl_dto_1 = require("./dto/update-acl.dto");
const swagger_1 = require("@nestjs/swagger");
let AclController = class AclController {
    constructor(aclService) {
        this.aclService = aclService;
    }
    create(createAclDto) {
        return this.aclService.create(createAclDto);
    }
    async findAll() {
        return await this.aclService.findAll();
    }
    async findOne(id) {
        return await this.aclService.findid(id);
    }
    async findslug(slug) {
        return await this.aclService.findslug(slug);
    }
    async findPagination(page, perPage) {
        return await this.aclService.findPagination(page, perPage);
    }
    async findQuery(query) {
        return await this.aclService.findQuery(query);
    }
    update(id, updateAclDto) {
        return this.aclService.update(id, updateAclDto);
    }
    remove(id) {
        return this.aclService.remove(id);
    }
};
exports.AclController = AclController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_acl_dto_1.CreateAclDto]),
    __metadata("design:returntype", void 0)
], AclController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AclController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('findid/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AclController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('findslug/:slug'),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AclController.prototype, "findslug", null);
__decorate([
    (0, common_1.Get)('pagination'),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('perPage')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], AclController.prototype, "findPagination", null);
__decorate([
    (0, common_1.Get)('findquery'),
    __param(0, (0, common_1.Query)('query')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AclController.prototype, "findQuery", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_acl_dto_1.UpdateAclDto]),
    __metadata("design:returntype", void 0)
], AclController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AclController.prototype, "remove", null);
exports.AclController = AclController = __decorate([
    (0, swagger_1.ApiTags)('acl'),
    (0, common_1.Controller)('acl'),
    __metadata("design:paramtypes", [acl_service_1.AclService])
], AclController);
//# sourceMappingURL=acl.controller.js.map