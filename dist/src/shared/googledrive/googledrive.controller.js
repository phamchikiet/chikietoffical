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
exports.GoogledriveController = void 0;
const common_1 = require("@nestjs/common");
const googledrive_service_1 = require("./googledrive.service");
const platform_express_1 = require("@nestjs/platform-express");
let GoogledriveController = class GoogledriveController {
    constructor(googledriveService) {
        this.googledriveService = googledriveService;
    }
    async uploadFile(file, folderId) {
        const result = await this.googledriveService.uploadFileFromBuffer(file, folderId);
        return { fileId: result };
    }
    async getFileList() {
        console.log("Run");
        const res = await this.googledriveService.getFileList();
        console.log(res);
        return res;
    }
    async deleteFile(fileId) {
        const res = await this.googledriveService.deleteFile(fileId);
        return res;
    }
};
exports.GoogledriveController = GoogledriveController;
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Query)('folderId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], GoogledriveController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GoogledriveController.prototype, "getFileList", null);
__decorate([
    (0, common_1.Delete)(':fileId'),
    __param(0, (0, common_1.Param)('fileId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GoogledriveController.prototype, "deleteFile", null);
exports.GoogledriveController = GoogledriveController = __decorate([
    (0, common_1.Controller)('googledrive'),
    __metadata("design:paramtypes", [googledrive_service_1.GoogledriveService])
], GoogledriveController);
//# sourceMappingURL=googledrive.controller.js.map