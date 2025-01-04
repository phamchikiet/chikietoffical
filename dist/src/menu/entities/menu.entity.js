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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuEntity = void 0;
const typeorm_1 = require("typeorm");
let MenuEntity = class MenuEntity {
    checkTitle() {
        if (!this.Title || this.Title.trim() === '') {
            this.Title = 'Noname';
        }
    }
};
exports.MenuEntity = MenuEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], MenuEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', collation: 'utf8_general_ci' }),
    __metadata("design:type", String)
], MenuEntity.prototype, "pid", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', collation: 'utf8_general_ci' }),
    __metadata("design:type", String)
], MenuEntity.prototype, "Title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', collation: 'utf8_general_ci' }),
    __metadata("design:type", String)
], MenuEntity.prototype, "Style", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', collation: 'utf8_general_ci' }),
    __metadata("design:type", String)
], MenuEntity.prototype, "Level", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', collation: 'utf8_general_ci' }),
    __metadata("design:type", String)
], MenuEntity.prototype, "Mota", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], MenuEntity.prototype, "Slug", void 0);
__decorate([
    (0, typeorm_1.Column)({ collation: "utf8_general_ci", type: "simple-json", default: () => "('{}')" }),
    __metadata("design:type", String)
], MenuEntity.prototype, "Image", void 0);
__decorate([
    (0, typeorm_1.Column)({ collation: "utf8_general_ci", type: "simple-json", default: () => "('[]')" }),
    __metadata("design:type", String)
], MenuEntity.prototype, "Menu", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], MenuEntity.prototype, "Type", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 1 }),
    __metadata("design:type", Number)
], MenuEntity.prototype, "Ordering", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], MenuEntity.prototype, "Status", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], MenuEntity.prototype, "isDelete", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], MenuEntity.prototype, "CreateAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], MenuEntity.prototype, "UpdateAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], MenuEntity.prototype, "DeleteAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], MenuEntity.prototype, "idCreate", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MenuEntity.prototype, "checkTitle", null);
exports.MenuEntity = MenuEntity = __decorate([
    (0, typeorm_1.Entity)('menu', { orderBy: { CreateAt: 'DESC' } })
], MenuEntity);
//# sourceMappingURL=menu.entity.js.map