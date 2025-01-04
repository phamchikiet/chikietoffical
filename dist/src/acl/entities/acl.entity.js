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
exports.AclEntity = void 0;
const typeorm_1 = require("typeorm");
let AclEntity = class AclEntity {
};
exports.AclEntity = AclEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], AclEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', collation: 'utf8_general_ci' }),
    __metadata("design:type", String)
], AclEntity.prototype, "Title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', collation: 'utf8_general_ci' }),
    __metadata("design:type", String)
], AclEntity.prototype, "Slug", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', collation: 'utf8_general_ci' }),
    __metadata("design:type", String)
], AclEntity.prototype, "resourceType", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], AclEntity.prototype, "resourceId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', collation: 'utf8_general_ci' }),
    __metadata("design:type", String)
], AclEntity.prototype, "subjectType", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], AclEntity.prototype, "subjectId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'set', enum: ['read', 'write', 'delete'] }),
    __metadata("design:type", Array)
], AclEntity.prototype, "permissions", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], AclEntity.prototype, "Type", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 1 }),
    __metadata("design:type", Number)
], AclEntity.prototype, "Ordering", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], AclEntity.prototype, "Status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], AclEntity.prototype, "CreateAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], AclEntity.prototype, "UpdateAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], AclEntity.prototype, "DeleteAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AclEntity.prototype, "idCreate", void 0);
exports.AclEntity = AclEntity = __decorate([
    (0, typeorm_1.Entity)('acl', { orderBy: { CreateAt: 'DESC' } })
], AclEntity);
//# sourceMappingURL=acl.entity.js.map