"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodocategoryModule = void 0;
const common_1 = require("@nestjs/common");
const todocategory_service_1 = require("./todocategory.service");
const todocategory_controller_1 = require("./todocategory.controller");
const typeorm_1 = require("@nestjs/typeorm");
const todocategory_entity_1 = require("./entities/todocategory.entity");
let TodocategoryModule = class TodocategoryModule {
};
exports.TodocategoryModule = TodocategoryModule;
exports.TodocategoryModule = TodocategoryModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([todocategory_entity_1.TodocategoryEntity])],
        controllers: [todocategory_controller_1.TodocategoryController],
        providers: [todocategory_service_1.TodocategoryService]
    })
], TodocategoryModule);
//# sourceMappingURL=todocategory.module.js.map