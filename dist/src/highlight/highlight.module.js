"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HighlightModule = void 0;
const common_1 = require("@nestjs/common");
const highlight_service_1 = require("./highlight.service");
const highlight_controller_1 = require("./highlight.controller");
const typeorm_1 = require("@nestjs/typeorm");
const highlight_entity_1 = require("./entities/highlight.entity");
let HighlightModule = class HighlightModule {
};
exports.HighlightModule = HighlightModule;
exports.HighlightModule = HighlightModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([highlight_entity_1.HighlightEntity]), HighlightModule],
        controllers: [highlight_controller_1.HighlightController],
        providers: [highlight_service_1.HighlightService]
    })
], HighlightModule);
//# sourceMappingURL=highlight.module.js.map