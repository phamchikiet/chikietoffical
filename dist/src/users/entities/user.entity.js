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
exports.UsersEntity = void 0;
const typeorm_1 = require("typeorm");
const create_user_dto_1 = require("../dto/create-user.dto");
let UsersEntity = class UsersEntity {
};
exports.UsersEntity = UsersEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], UsersEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ collation: "utf8_general_ci" }),
    __metadata("design:type", String)
], UsersEntity.prototype, "gid", void 0);
__decorate([
    (0, typeorm_1.Column)({ collation: "utf8_general_ci" }),
    __metadata("design:type", String)
], UsersEntity.prototype, "fid", void 0);
__decorate([
    (0, typeorm_1.Column)({ collation: "utf8_general_ci" }),
    __metadata("design:type", String)
], UsersEntity.prototype, "zid", void 0);
__decorate([
    (0, typeorm_1.Column)({ collation: "utf8_general_ci" }),
    __metadata("design:type", String)
], UsersEntity.prototype, "pid", void 0);
__decorate([
    (0, typeorm_1.Column)({ collation: "utf8_general_ci" }),
    __metadata("design:type", String)
], UsersEntity.prototype, "SDT", void 0);
__decorate([
    (0, typeorm_1.Column)({ collation: "utf8_general_ci" }),
    __metadata("design:type", String)
], UsersEntity.prototype, "idGroup", void 0);
__decorate([
    (0, typeorm_1.Column)({ collation: "utf8_general_ci" }),
    __metadata("design:type", String)
], UsersEntity.prototype, "Code", void 0);
__decorate([
    (0, typeorm_1.Column)({ collation: "utf8_general_ci" }),
    __metadata("design:type", String)
], UsersEntity.prototype, "Hoten", void 0);
__decorate([
    (0, typeorm_1.Column)({ collation: "utf8_general_ci" }),
    __metadata("design:type", String)
], UsersEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", collation: "utf8_general_ci" }),
    __metadata("design:type", String)
], UsersEntity.prototype, "Gioitinh", void 0);
__decorate([
    (0, typeorm_1.Column)({ collation: "utf8_general_ci", type: "simple-json", default: () => "('[]')" }),
    __metadata("design:type", String)
], UsersEntity.prototype, "EditChinhanhs", void 0);
__decorate([
    (0, typeorm_1.Column)({ collation: "utf8_general_ci", type: "simple-json", default: () => "('[]')" }),
    __metadata("design:type", String)
], UsersEntity.prototype, "Diachi", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UsersEntity.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ collation: "utf8_general_ci", type: "simple-json", default: () => "('[]')" }),
    __metadata("design:type", String)
], UsersEntity.prototype, "ListImage", void 0);
__decorate([
    (0, typeorm_1.Column)({ collation: "utf8_general_ci", type: "simple-json", default: () => "('[]')" }),
    __metadata("design:type", String)
], UsersEntity.prototype, "Profile", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: create_user_dto_1.Role, default: create_user_dto_1.Role.User }),
    __metadata("design:type", String)
], UsersEntity.prototype, "Role", void 0);
__decorate([
    (0, typeorm_1.Column)({ collation: "utf8_general_ci", type: "simple-json", default: () => "('[]')" }),
    __metadata("design:type", String)
], UsersEntity.prototype, "Phanquyen", void 0);
__decorate([
    (0, typeorm_1.Column)({ collation: "utf8_general_ci", type: "simple-json", default: () => "('[]')" }),
    __metadata("design:type", String)
], UsersEntity.prototype, "Menu", void 0);
__decorate([
    (0, typeorm_1.Column)({ collation: "utf8_general_ci", type: "simple-array" }),
    __metadata("design:type", Array)
], UsersEntity.prototype, "fcmToken", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], UsersEntity.prototype, "Type", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 1 }),
    __metadata("design:type", Number)
], UsersEntity.prototype, "Ordering", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], UsersEntity.prototype, "Status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], UsersEntity.prototype, "CreateAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], UsersEntity.prototype, "UpdateAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], UsersEntity.prototype, "DeleteAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UsersEntity.prototype, "idCreate", void 0);
exports.UsersEntity = UsersEntity = __decorate([
    (0, typeorm_1.Entity)('users', { orderBy: { CreateAt: 'DESC' } })
], UsersEntity);
//# sourceMappingURL=user.entity.js.map