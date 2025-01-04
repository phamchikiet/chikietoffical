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
exports.UploadController = void 0;
const common_1 = require("@nestjs/common");
const upload_service_1 = require("./upload.service");
const create_upload_dto_1 = require("./dto/create-upload.dto");
const platform_express_1 = require("@nestjs/platform-express");
const googledrive_service_1 = require("../shared/googledrive/googledrive.service");
let UploadController = class UploadController {
    constructor(uploadService, googledriveService) {
        this.uploadService = uploadService;
        this.googledriveService = googledriveService;
    }
    create(createUploadDto) {
        return this.uploadService.create(createUploadDto);
    }
    async uploadFile(file, folderId) {
        const result = await this.googledriveService.uploadFileFromBuffer(file, folderId);
        const data = {
            Title: file.originalname,
            fileId: result?.fileId,
            folderId: result?.folderId,
            Metadata: result?.Metadata,
            Type: 'googledrive',
        };
        const reponse = await this.uploadService.create(data);
        return reponse;
    }
    findAll() {
        return this.uploadService.findAll();
    }
    update(id, data) {
        return this.uploadService.update(id, data);
    }
    remove(id) {
        return this.uploadService.remove(id);
    }
};
exports.UploadController = UploadController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_upload_dto_1.CreateUploadDto]),
    __metadata("design:returntype", void 0)
], UploadController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('googledrive'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Query)('folderId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UploadController.prototype, "findAll", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], UploadController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UploadController.prototype, "remove", null);
exports.UploadController = UploadController = __decorate([
    (0, common_1.Controller)('upload'),
    __metadata("design:paramtypes", [upload_service_1.UploadService,
        googledrive_service_1.GoogledriveService])
], UploadController);
//# sourceMappingURL=upload.controller.js.map