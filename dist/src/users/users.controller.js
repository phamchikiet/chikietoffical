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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const update_user_dto_1 = require("./dto/update-user.dto");
const passport_1 = require("@nestjs/passport");
const usergroup_service_1 = require("../usergroup/usergroup.service");
const swagger_1 = require("@nestjs/swagger");
const roles_guard_1 = require("./entities/roles.guard");
const roles_decorator_1 = require("./entities/roles.decorator");
let UsersController = class UsersController {
    constructor(usersService, _UsergroupService) {
        this.usersService = usersService;
        this._UsergroupService = _UsergroupService;
    }
    async login(user) {
        return await this.usersService.login(user);
    }
    async loginbygoogle(user) {
        return await this.usersService.loginsocial(user);
    }
    async randompass(dulieu) {
        return await this.randompass(dulieu);
    }
    async getProfile(req) {
        const userPromise = this.usersService.findbyEmail(req.user);
        const groupsPromise = this._UsergroupService.findAll();
        const [user, Groups] = await Promise.all([userPromise, groupsPromise]);
        if (user) {
            delete user.password;
            user['Groups'] = Groups.find((v) => v.id == user.idGroup)?.ListMenu;
            return user;
        }
        else {
            return false;
        }
    }
    async create(createUserDto) {
        console.log(createUserDto);
        const newUser = await this.usersService.create(createUserDto);
        if (newUser[0]) {
            return [true, 'Đăng Ký Thành Công'];
        }
        else {
            return newUser;
        }
    }
    async checksocial(data) {
        const newUser = await this.usersService.loginsocial(data);
    }
    findAll() {
        return this.usersService.findAll();
    }
    findOne(id) {
        return this.usersService.read(id);
    }
    async findid(id) {
        const user = await this.usersService.findid(id);
        const Groups = await this._UsergroupService.findAll();
        user['Groups'] = Groups.find((v) => v.id == user.idGroup)?.ListMenu;
        return user;
    }
    async findSDT(sdt) {
        const user = await this.usersService.findSDT(sdt);
        const Groups = await this._UsergroupService.findAll();
        user['Groups'] = Groups.find((v) => v.id == user.idGroup);
        return user;
    }
    findAdmin() {
        return this.usersService.findAdmin();
    }
    async findQuery(SearchParams) {
        console.log(SearchParams);
        return await this.usersService.findQuery(SearchParams);
    }
    update(id, updateUserDto) {
        return this.usersService.update(id, updateUserDto);
    }
    changepass(data) {
        return this.usersService.changepass(data);
    }
    remove(id) {
        return this.usersService.remove(id);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('loginbygoogle'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "loginbygoogle", null);
__decorate([
    (0, common_1.Post)('randompass'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "randompass", null);
__decorate([
    (0, common_1.Get)('profile'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('websitetoken')),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Post)("register"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "create", null);
__decorate([
    (0, common_1.Post)("checksocial"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "checksocial", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('websitetoken'), roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('findid/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findid", null);
__decorate([
    (0, common_1.Get)('SDT/:sdt'),
    __param(0, (0, common_1.Param)('sdt')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findSDT", null);
__decorate([
    (0, common_1.Get)('/get/admin'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('websitetoken')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findAdmin", null);
__decorate([
    (0, common_1.Post)('search'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findQuery", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "update", null);
__decorate([
    (0, common_1.Post)('changepass'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "changepass", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "remove", null);
exports.UsersController = UsersController = __decorate([
    (0, swagger_1.ApiTags)('users'),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        usergroup_service_1.UsergroupService])
], UsersController);
//# sourceMappingURL=users.controller.js.map