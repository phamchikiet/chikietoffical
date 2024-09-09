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
exports.HoadonchitietEntity = void 0;
const typeorm_1 = require("typeorm");
let HoadonchitietEntity = class HoadonchitietEntity {
};
exports.HoadonchitietEntity = HoadonchitietEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], HoadonchitietEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', collation: 'utf8_general_ci', nullable: true }),
    __metadata("design:type", String)
], HoadonchitietEntity.prototype, "nbmst", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', collation: 'utf8_general_ci', nullable: true }),
    __metadata("design:type", String)
], HoadonchitietEntity.prototype, "khmshdon", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', collation: 'utf8_general_ci', nullable: true }),
    __metadata("design:type", String)
], HoadonchitietEntity.prototype, "khhdon", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', collation: 'utf8_general_ci', nullable: true }),
    __metadata("design:type", String)
], HoadonchitietEntity.prototype, "shdon", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', collation: 'utf8_general_ci', nullable: true }),
    __metadata("design:type", String)
], HoadonchitietEntity.prototype, "nbten", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', collation: 'utf8_general_ci', nullable: true }),
    __metadata("design:type", String)
], HoadonchitietEntity.prototype, "nbdchi", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', collation: 'utf8_general_ci', nullable: true }),
    __metadata("design:type", String)
], HoadonchitietEntity.prototype, "nmtnmua", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', collation: 'utf8_general_ci', nullable: true }),
    __metadata("design:type", String)
], HoadonchitietEntity.prototype, "nmdchi", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], HoadonchitietEntity.prototype, "tdlap", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'bigint' }),
    __metadata("design:type", Number)
], HoadonchitietEntity.prototype, "tgtcthue", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'bigint' }),
    __metadata("design:type", Number)
], HoadonchitietEntity.prototype, "tgtthue", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'bigint' }),
    __metadata("design:type", Number)
], HoadonchitietEntity.prototype, "tgtttbso", void 0);
__decorate([
    (0, typeorm_1.Column)({ collation: "utf8_general_ci", type: "simple-json", default: () => "('[]')" }),
    __metadata("design:type", String)
], HoadonchitietEntity.prototype, "hdhhdvu", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], HoadonchitietEntity.prototype, "thlap", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], HoadonchitietEntity.prototype, "Type", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], HoadonchitietEntity.prototype, "idDelete", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], HoadonchitietEntity.prototype, "Status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], HoadonchitietEntity.prototype, "CreateAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], HoadonchitietEntity.prototype, "UpdateAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], HoadonchitietEntity.prototype, "DeleteAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], HoadonchitietEntity.prototype, "idCreate", void 0);
exports.HoadonchitietEntity = HoadonchitietEntity = __decorate([
    (0, typeorm_1.Entity)('hoadonchitiet', { orderBy: { CreateAt: 'DESC' } })
], HoadonchitietEntity);
//# sourceMappingURL=hoadonchitiet.entity.js.map