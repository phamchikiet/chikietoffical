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
exports.SettingEntity = void 0;
const typeorm_1 = require("typeorm");
let SettingEntity = class SettingEntity {
    checkTitle() {
        if (!this.Title || this.Title.trim() === '') {
            this.Title = 'Noname';
        }
    }
};
exports.SettingEntity = SettingEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], SettingEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', collation: 'utf8_general_ci' }),
    __metadata("design:type", String)
], SettingEntity.prototype, "Title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', collation: 'utf8_general_ci' }),
    __metadata("design:type", String)
], SettingEntity.prototype, "Mota", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], SettingEntity.prototype, "Slug", void 0);
__decorate([
    (0, typeorm_1.Column)({ collation: "utf8_general_ci", type: "simple-json", default: () => "('{}')" }),
    __metadata("design:type", String)
], SettingEntity.prototype, "Image", void 0);
__decorate([
    (0, typeorm_1.Column)({ collation: "utf8_general_ci", type: "simple-json", default: () => "('{}')" }),
    __metadata("design:type", String)
], SettingEntity.prototype, "Field", void 0);
__decorate([
    (0, typeorm_1.Column)({ collation: "utf8_general_ci", type: "simple-json", default: () => "('[]')" }),
    __metadata("design:type", String)
], SettingEntity.prototype, "Setting", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], SettingEntity.prototype, "Type", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 1 }),
    __metadata("design:type", Number)
], SettingEntity.prototype, "Ordering", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], SettingEntity.prototype, "Status", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], SettingEntity.prototype, "isDelete", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], SettingEntity.prototype, "CreateAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], SettingEntity.prototype, "UpdateAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], SettingEntity.prototype, "DeleteAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], SettingEntity.prototype, "idCreate", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SettingEntity.prototype, "checkTitle", null);
exports.SettingEntity = SettingEntity = __decorate([
    (0, typeorm_1.Entity)('setting', { orderBy: { CreateAt: 'DESC' } })
], SettingEntity);
//# sourceMappingURL=setting.entity.js.map