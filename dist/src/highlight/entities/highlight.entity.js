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
exports.HighlightEntity = void 0;
const typeorm_1 = require("typeorm");
let HighlightEntity = class HighlightEntity {
    checkTitle() {
        if (!this.Title || this.Title.trim() === '') {
            this.Title = 'Noname';
        }
    }
};
exports.HighlightEntity = HighlightEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], HighlightEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', collation: 'utf8_general_ci' }),
    __metadata("design:type", String)
], HighlightEntity.prototype, "pid", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', collation: 'utf8_general_ci' }),
    __metadata("design:type", String)
], HighlightEntity.prototype, "idDM", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', collation: 'utf8_general_ci' }),
    __metadata("design:type", String)
], HighlightEntity.prototype, "Title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', collation: 'utf8_general_ci' }),
    __metadata("design:type", String)
], HighlightEntity.prototype, "Mota", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], HighlightEntity.prototype, "Slug", void 0);
__decorate([
    (0, typeorm_1.Column)({ collation: "utf8_general_ci", type: "simple-json", default: () => "('[]')" }),
    __metadata("design:type", String)
], HighlightEntity.prototype, "attachments", void 0);
__decorate([
    (0, typeorm_1.Column)({ collation: "utf8_general_ci", type: "simple-json", default: () => "('[]')" }),
    __metadata("design:type", String)
], HighlightEntity.prototype, "Content", void 0);
__decorate([
    (0, typeorm_1.Column)({ collation: "utf8_general_ci", type: "simple-json", default: () => "('{}')" }),
    __metadata("design:type", String)
], HighlightEntity.prototype, "Image", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], HighlightEntity.prototype, "Type", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 1 }),
    __metadata("design:type", Number)
], HighlightEntity.prototype, "Ordering", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], HighlightEntity.prototype, "Status", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], HighlightEntity.prototype, "isDelete", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], HighlightEntity.prototype, "CreateAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], HighlightEntity.prototype, "UpdateAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], HighlightEntity.prototype, "DeleteAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], HighlightEntity.prototype, "idCreate", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HighlightEntity.prototype, "checkTitle", null);
exports.HighlightEntity = HighlightEntity = __decorate([
    (0, typeorm_1.Entity)('highlight', { orderBy: { CreateAt: 'DESC' } })
], HighlightEntity);
//# sourceMappingURL=highlight.entity.js.map