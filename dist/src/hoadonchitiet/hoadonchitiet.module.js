"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HoadonchitietModule = void 0;
const common_1 = require("@nestjs/common");
const hoadonchitiet_service_1 = require("./hoadonchitiet.service");
const hoadonchitiet_controller_1 = require("./hoadonchitiet.controller");
const typeorm_1 = require("@nestjs/typeorm");
const hoadonchitiet_entity_1 = require("./entities/hoadonchitiet.entity");
let HoadonchitietModule = class HoadonchitietModule {
};
exports.HoadonchitietModule = HoadonchitietModule;
exports.HoadonchitietModule = HoadonchitietModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([hoadonchitiet_entity_1.HoadonchitietEntity])],
        controllers: [hoadonchitiet_controller_1.HoadonchitietController],
        providers: [hoadonchitiet_service_1.HoadonchitietService]
    })
], HoadonchitietModule);
//# sourceMappingURL=hoadonchitiet.module.js.map