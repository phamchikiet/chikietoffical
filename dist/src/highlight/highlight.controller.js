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
exports.HighlightController = void 0;
const common_1 = require("@nestjs/common");
const highlight_service_1 = require("./highlight.service");
let HighlightController = class HighlightController {
    constructor(highlightService) {
        this.highlightService = highlightService;
    }
    create(data) {
        return this.highlightService.create(data);
    }
    async findAll() {
        return await this.highlightService.findAll();
    }
    async findOne(id) {
        return await this.highlightService.findid(id);
    }
    async findslug(slug) {
        return await this.highlightService.findslug(slug);
    }
    async findQuery(SearchParams) {
        console.log(SearchParams);
        return await this.highlightService.findQuery(SearchParams);
    }
    update(id, data) {
        return this.highlightService.update(id, data);
    }
    remove(id) {
        return this.highlightService.remove(id);
    }
};
exports.HighlightController = HighlightController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], HighlightController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HighlightController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('findid/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HighlightController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('findslug/:slug'),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HighlightController.prototype, "findslug", null);
__decorate([
    (0, common_1.Post)('search'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], HighlightController.prototype, "findQuery", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], HighlightController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HighlightController.prototype, "remove", null);
exports.HighlightController = HighlightController = __decorate([
    (0, common_1.Controller)('highlight'),
    __metadata("design:paramtypes", [highlight_service_1.HighlightService])
], HighlightController);
//# sourceMappingURL=highlight.controller.js.map