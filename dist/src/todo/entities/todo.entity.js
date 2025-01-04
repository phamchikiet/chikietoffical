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
var TodoEntity_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoEntity = void 0;
const typeorm_1 = require("typeorm");
let TodoEntity = TodoEntity_1 = class TodoEntity {
    checkTitle() {
        if (!this.Title || this.Title.trim() === '') {
            this.Title = 'Noname';
        }
    }
    async setOrdering() {
        const repo = (0, typeorm_1.getRepository)(TodoEntity_1);
        const maxOrdering = await repo
            .createQueryBuilder("todo")
            .select("MAX(todo.Ordering)", "max")
            .getRawOne();
        this.Ordering = (maxOrdering.max || 0) + 1;
    }
};
exports.TodoEntity = TodoEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], TodoEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', collation: 'utf8_general_ci' }),
    __metadata("design:type", String)
], TodoEntity.prototype, "pid", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', collation: 'utf8_general_ci' }),
    __metadata("design:type", String)
], TodoEntity.prototype, "idDM", void 0);
__decorate([
    (0, typeorm_1.Column)({ collation: "utf8_general_ci", type: "simple-json", default: () => "('[]')" }),
    __metadata("design:type", String)
], TodoEntity.prototype, "idUser", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', collation: 'utf8_general_ci' }),
    __metadata("design:type", String)
], TodoEntity.prototype, "Title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', collation: 'utf8_general_ci' }),
    __metadata("design:type", String)
], TodoEntity.prototype, "Mota", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], TodoEntity.prototype, "Slug", void 0);
__decorate([
    (0, typeorm_1.Column)({ collation: "utf8_general_ci", type: "simple-json", default: () => "('[]')" }),
    __metadata("design:type", String)
], TodoEntity.prototype, "attachments", void 0);
__decorate([
    (0, typeorm_1.Column)({ collation: "utf8_general_ci", type: "simple-json", default: () => "('[]')" }),
    __metadata("design:type", String)
], TodoEntity.prototype, "Content", void 0);
__decorate([
    (0, typeorm_1.Column)({ collation: "utf8_general_ci", type: "simple-json", default: () => "('{}')" }),
    __metadata("design:type", String)
], TodoEntity.prototype, "Image", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], TodoEntity.prototype, "Type", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 1 }),
    __metadata("design:type", Number)
], TodoEntity.prototype, "Ordering", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], TodoEntity.prototype, "isDelete", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], TodoEntity.prototype, "Priority", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], TodoEntity.prototype, "Status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], TodoEntity.prototype, "CreateAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], TodoEntity.prototype, "UpdateAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], TodoEntity.prototype, "DeleteAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], TodoEntity.prototype, "idCreate", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TodoEntity.prototype, "checkTitle", null);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TodoEntity.prototype, "setOrdering", null);
exports.TodoEntity = TodoEntity = TodoEntity_1 = __decorate([
    (0, typeorm_1.Entity)('todos', { orderBy: { CreateAt: 'DESC' } })
], TodoEntity);
//# sourceMappingURL=todo.entity.js.map