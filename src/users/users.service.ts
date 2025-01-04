import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersEntity } from './entities/user.entity';
import { GenId } from 'src/shared/util';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,
    private jwtService: JwtService,
  ) {}

  async login(data: any): Promise<any> {
    const CheckSDT = await this.findbySDT(data);
    const CheckEmail = await this.findbyEmail(data);
    let user = CheckSDT || CheckEmail;
    if (!user) {
      return [404, 'Số Điện Thoại Hoặc Email Chưa Đăng Ký'];
    } else {
      const compare = await bcrypt.compare(data.password, user.password);
      if (!compare) {
        return [401, 'Sai Mật Khẩu'];
      } else {
        const doLogin = {
          access_token: this.jwtService.sign({
            SDT: data.SDT,
            email: data.email,
          }),
          data,
        };
        return [200, doLogin];
      }
    }
  }

  async loginsocial(data: any) {
    const userByEmail = await this.usersRepository.findOne({
      where: { email: data.email },
    });
    const userByGid = await this.usersRepository.findOne({
      where: { gid: data.uid },
    });

    let user = userByGid || userByEmail;

    if (user) {
      // If email exists but gid is missing, update gid
      if (!user.gid) {
        user.gid = data.uid;
        await this.usersRepository.save(user);
      }

      const token = this.jwtService.sign({
        SDT: user.SDT,
        email: user.email,
        gid: user.gid,
      });
      return [true, { access_token: token, user }];
    }

    // Create new user if no matching user is found
    data.gid = data.uid;
    data.password = await bcrypt.hash(GenId(8, false), 10);
    data.Code = Math.floor(100000 + Math.random() * 900000);

    const newUser: any = await this.usersRepository.save(
      this.usersRepository.create(data),
    );
    const token = this.jwtService.sign({
      SDT: newUser.SDT,
      email: newUser.email,
      gid: newUser.gid,
    });

    return [true, { access_token: token, newUser }];
  }

  async randompass(data): Promise<any> {
    const user = await this.findbySDT(data);
    const random = Math.random().toString(36).slice(-8);
    user.password = await bcrypt.hash(random, 10);
    const result = await this.update(user.id, user);
    return [true, random];
  }

  async validateUser(user: any): Promise<any> {
    const data = await this.findbySDT(user);
    const compare = await bcrypt.compare(user.password, data.password);
    if (data && compare) {
      console.log(data);
    }
    return null;
  }

  async create(data: any) {
    const checkSDT = await this.findbySDT(data);
    const checkEmail = await this.findbyEmail(data);
    console.log(checkSDT);

    if (checkSDT) {
      return [false, 'Số Điện Thoại Đã Tồn Tại'];
    }
    if (checkEmail) {
      return [false, 'Email Đã Tồn Tại'];
    }

    data.password = await bcrypt.hash(data.password, 10);
    const validationCode = Math.floor(100000 + Math.random() * 900000);
    data.Code = validationCode;
    this.usersRepository.create(data);
    const newUser = await this.usersRepository.save(data);
    return [true, newUser];
  }

  async findAll() {
    const users = await this.usersRepository.find();
    return users;
  }

  async read(id: string) {
    return await this.usersRepository.findOne({ where: { id: id } });
  }

  async findid(id: string) {
    return await this.usersRepository.findOne({ where: { id: id } });
  }

  async findSDT(sdt: any) {
    return await this.usersRepository.findOne({
      where: { SDT: sdt },
    });
  }

  async findbySDT(data: any) {
    if (data.SDT) {
      return await this.usersRepository.findOne({ where: { SDT: data.SDT } });
    } else return null;
  }
  async findbyEmail(data: any) {
    if (data.email) {
      return await this.usersRepository.findOne({
        where: { email: data.email },
      });
    } else return null;
  }

  async findAdmin() {
    const admin = await this.usersRepository.find({ where: { Role: 'admin' } });
    return admin;
  }

  async findQuery(params: any) {
    const queryBuilder = this.usersRepository.createQueryBuilder('users');
    if (params.hasOwnProperty('Batdau') && params.hasOwnProperty('Ketthuc')) {
      queryBuilder.andWhere('users.CreateAt BETWEEN :startDate AND :endDate', {
        startDate: params.Batdau,
        endDate: params.Ketthuc,
      });
    }
    if (params.hasOwnProperty('Title')) {
      queryBuilder.andWhere('users.Title LIKE :Title', {
        SDT: `%${params.Title}%`,
      });
    }
    if (params.hasOwnProperty('gid')) {
      console.log(params.gid);

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

  async update(id: string, data: Partial<UpdateUserDto>) {
    await this.usersRepository.save(data);
    return await this.read(id);
  }

  async remove(id: string) {
    await this.usersRepository.delete({ id });
    return { deleted: true };
  }

  async changepass(data: any): Promise<any> {
    const user = await this.read(data.id);
    if (!user) {
      return [409, 'Tài Khoản Không Đúng'];
    }
    const checkPass = await bcrypt.compare(data.oldpass, user.password);
    if (!checkPass) {
      return [409, 'Mật Khẩu Không Đúng'];
    }
    user.password = await bcrypt.hash(data.newpass, 10);
    await this.usersRepository.update(user.id, user);
    await this.usersRepository.save(user);
    return [200, 'Cập Nhật Thành Công'];
  }
}
