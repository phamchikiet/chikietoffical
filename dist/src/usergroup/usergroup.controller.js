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
exports.UsergroupController = void 0;
const common_1 = require("@nestjs/common");
const usergroup_service_1 = require("./usergroup.service");
const create_usergroup_dto_1 = require("./dto/create-usergroup.dto");
const update_usergroup_dto_1 = require("./dto/update-usergroup.dto");
const swagger_1 = require("@nestjs/swagger");
let UsergroupController = class UsergroupController {
    constructor(usergroupService) {
        this.usergroupService = usergroupService;
    }
    create(createUsergroupDto) {
        return this.usergroupService.create(createUsergroupDto);
    }
    async findAll() {
        return await this.usergroupService.findAll();
    }
    async findOne(id) {
        return await this.usergroupService.findid(id);
    }
    async findslug(slug) {
        return await this.usergroupService.findslug(slug);
    }
    async findPagination(page, perPage) {
        return await this.usergroupService.findPagination(page, perPage);
    }
    async findQuery(query) {
        return await this.usergroupService.findQuery(query);
    }
    update(id, updateUsergroupDto) {
        return this.usergroupService.update(id, updateUsergroupDto);
    }
    remove(id) {
        return this.usergroupService.remove(id);
    }
};
exports.UsergroupController = UsergroupController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_usergroup_dto_1.CreateUsergroupDto]),
    __metadata("design:returntype", void 0)
], UsergroupController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsergroupController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('findid/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsergroupController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('findslug/:slug'),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsergroupController.prototype, "findslug", null);
__decorate([
    (0, common_1.Get)('pagination'),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('perPage')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], UsergroupController.prototype, "findPagination", null);
__decorate([
    (0, common_1.Get)('findquery'),
    __param(0, (0, common_1.Query)('query')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsergroupController.prototype, "findQuery", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_usergroup_dto_1.UpdateUsergroupDto]),
    __metadata("design:returntype", void 0)
], UsergroupController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsergroupController.prototype, "remove", null);
exports.UsergroupController = UsergroupController = __decorate([
    (0, swagger_1.ApiTags)('usergroup'),
    (0, common_1.Controller)('usergroup'),
    __metadata("design:paramtypes", [usergroup_service_1.UsergroupService])
], UsergroupController);
//# sourceMappingURL=usergroup.controller.js.map