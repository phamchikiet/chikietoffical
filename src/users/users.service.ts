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
    private jwtService: JwtService
  ) { }

  async login(user: any): Promise<any> {
    const data = await this.findbySDT(user); 
    if(!data) {
      return [false, 'Số Điện Thoại Chưa Đăng Ký']
    }
    else {
      const compare = await bcrypt.compare(user.password, data.password);
      if (!compare) {
        return [false, 'Sai Mật Khẩu']
      }
      else {
        const doLogin = {access_token: this.jwtService.sign({SDT: data.SDT, email: data.email}), data}
        return [true, doLogin]
      }
    }
  }  

  async loginsocial(data: any) {
    const checkgid = await this.usersRepository.findOne({ where: { gid: data.uid } });
    if(checkgid) {
      const User = checkgid
      const doLogin = {access_token: this.jwtService.sign({SDT: User.SDT, email: User.email, gid: User.gid}), User}
      return [true, doLogin]
    } 
    else {
      const password = GenId(8, false)
      data.SDT = data.uid
      data.gid = data.uid
      data.password = await bcrypt.hash(password, 10);
      const validationCode = Math.floor(100000 + Math.random() * 900000);
      data.Code = validationCode;
      this.usersRepository.create(data);
      const newUser = await this.usersRepository.save(data);
      const doLogin = {access_token: this.jwtService.sign({SDT: newUser.SDT, email: newUser.email, gid: newUser.gid}), newUser}
      return [true, doLogin];
    }
  }

  async randompass(data): Promise<any> {
    const user = await this.findbySDT(data);
    const random = Math.random().toString(36).slice(-8);
    user.password = await bcrypt.hash(random, 10);
    const result = await this.update(user.id, user)
    return [true, random]
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

  async findbyEmail(user: any) {
    return await this.usersRepository.findOne({ where: { email: user.email } });
  }

  async findSDT(sdt: any) {
    return await this.usersRepository.findOne({
      where: { SDT: sdt },
    });
  }

  async findbySDT(data: any) {
    if (data.SDT) {
      return await this.usersRepository.findOne({ where: { SDT: data.SDT } });
    }
    else return null
  }

  async findAdmin() {
    const admin = await this.usersRepository.find(
      { where: { Role: 'admin' } }
    );
    return admin
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
      queryBuilder.andWhere('users.Title LIKE :Title', { SDT: `%${params.Title}%` });
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
      throw new ConflictException('Tài Khoản Không Đúng');
    }
    const checkPass = await bcrypt.compare(data.oldpass, user.password);
    if (!checkPass) {
      throw new ConflictException('Mật Khẩu Không Trùng Khớp');
    }
    user.password = await bcrypt.hash(data.newpass, 10);
    await this.usersRepository.update(user.id, user);
    return await this.usersRepository.save(user);
  }
}
