"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogledriveModule = void 0;
const common_1 = require("@nestjs/common");
const googledrive_service_1 = require("./googledrive.service");
const googledrive_controller_1 = require("./googledrive.controller");
let GoogledriveModule = class GoogledriveModule {
};
exports.GoogledriveModule = GoogledriveModule;
exports.GoogledriveModule = GoogledriveModule = __decorate([
    (0, common_1.Module)({
        controllers: [googledrive_controller_1.GoogledriveController],
        providers: [googledrive_service_1.GoogledriveService],
    })
], GoogledriveModule);
//# sourceMappingURL=googledrive.module.js.map