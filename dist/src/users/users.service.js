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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const util_1 = require("../shared/util");
const jwt_1 = require("@nestjs/jwt");
let UsersService = class UsersService {
    constructor(usersRepository, jwtService) {
        this.usersRepository = usersRepository;
        this.jwtService = jwtService;
    }
    async login(user) {
        const data = await this.findbySDT(user);
        if (!data) {
            return [false, 'Số Điện Thoại Chưa Đăng Ký'];
        }
        else {
            const compare = await Bun.password.verify(user.password, data.password);
            if (!compare) {
                return [false, 'Sai Mật Khẩu'];
            }
            else {
                const doLogin = { access_token: this.jwtService.sign({ SDT: data.SDT, email: data.email }), data };
                return [true, doLogin];
            }
        }
    }
    async randompass(data) {
        const user = await this.findbySDT(data);
        const random = Math.random().toString(36).slice(-8);
        user.password = await Bun.password.hash(random);
        const result = await this.update(user.id, user);
        return [true, random];
    }
    async validateUser(user) {
        const data = await this.findbySDT(user);
        const compare = await Bun.password.verify(user.password, data.password);
        if (data && compare) {
            console.log(data);
        }
        return null;
    }
    async create(data) {
        const checkSDT = await this.findbySDT(data);
        const checkEmail = await this.findbyEmail(data);
        console.log(checkSDT);
        if (checkSDT) {
            return [false, 'Số Điện Thoại Đã Tồn Tại'];
        }
        if (checkEmail) {
            return [false, 'Email Đã Tồn Tại'];
        }
        data.password = await Bun.password.hash(data.password);
        const validationCode = Math.floor(100000 + Math.random() * 900000);
        data.Code = validationCode;
        this.usersRepository.create(data);
        const newUser = await this.usersRepository.save(data);
        return [true, newUser];
    }
    async loginsocial(data) {
        console.log("data", data);
        const checkgid = await this.findQuery({ gid: data.gid });
        console.log("checkgid", checkgid);
        if (checkgid.totalCount > 0) {
            const doLogin = { access_token: this.jwtService.sign({ SDT: data.SDT, email: data.email }), data };
            return [true, doLogin];
        }
        else {
            const password = (0, util_1.GenId)(8, false);
            data.SDT = data.gid;
            data.password = await Bun.password.hash(password);
            const validationCode = Math.floor(100000 + Math.random() * 900000);
            data.Code = validationCode;
            console.log(data);
            console.log(password);
            this.usersRepository.create(data);
            const newUser = await this.usersRepository.save(data);
            const doLogin = { access_token: this.jwtService.sign({ SDT: newUser.SDT, email: newUser.email }), newUser };
            return [true, newUser];
        }
    }
    async findAll() {
        const users = await this.usersRepository.find();
        return users;
    }
    async read(id) {
        return await this.usersRepository.findOne({ where: { id: id } });
    }
    async findid(id) {
        return await this.usersRepository.findOne({ where: { id: id } });
    }
    async findbyEmail(user) {
        return await this.usersRepository.findOne({ where: { email: user.email } });
    }
    async findSDT(sdt) {
        return await this.usersRepository.findOne({
            where: { SDT: sdt },
        });
    }
    async findbySDT(data) {
        if (data.SDT) {
            return await this.usersRepository.findOne({ where: { SDT: data.SDT } });
        }
        else
            return null;
    }
    async findAdmin() {
        const admin = await this.usersRepository.find({ where: { Role: 'admin' } });
        return admin;
    }
    async findQuery(params) {
        console.error(params);
        const queryBuilder = this.usersRepository.createQueryBuilder('users');
        if (params.hasOwnProperty('Batdau') && params.hasOwnProperty('Ketthuc')) {
            queryBuilder.andWhere('users.CreateAt BETWEEN :startDate AND :endDate', {
                startDate: params.Batdau,
                endDate: params.Ketthuc,
            });
        }
        if (params.hasOwnProperty('Title')) {
            queryBuilder.andWhere('users.Title LIKE :Title', { SDT: `%${params.Title}%` });
        }
        if (params.hasOwnProperty('gid')) {
            queryBuilder.andWhere('users.gid LIKE :gid', { gid: `${params.gid}` });
        }
        if (params.hasOwnProperty('fid')) {
            queryBuilder.andWhere('users.fid LIKE :fid', { fid: `${params.fid}` });
        }
        const [items, totalCount] = await queryBuilder
            .limit(params.pageSize || 10)
            .offset(params.pageNumber * params.pageSize || 0)
            .getManyAndCount();
        console.log(items, totalCount);
        return { items, totalCount };
    }
    async update(id, data) {
        await this.usersRepository.save(data);
        return await this.read(id);
    }
    async remove(id) {
        await this.usersRepository.delete({ id });
        return { deleted: true };
    }
    async changepass(data) {
        const user = await this.read(data.id);
        if (!user) {
            throw new common_1.ConflictException('Tài Khoản Không Đúng');
        }
        const checkPass = await Bun.password.verify(data.oldpass, user.password);
        if (!checkPass) {
            throw new common_1.ConflictException('Mật Khẩu Không Trùng Khớp');
        }
        user.password = await Bun.password.hash(data.newpass);
        await this.usersRepository.update(user.id, user);
        return await this.usersRepository.save(user);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UsersEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], UsersService);
//# sourceMappingURL=users.service.js.map