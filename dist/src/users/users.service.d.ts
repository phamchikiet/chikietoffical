import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersEntity } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
export declare class UsersService {
    private usersRepository;
    private jwtService;
    constructor(usersRepository: Repository<UsersEntity>, jwtService: JwtService);
    login(data: any): Promise<any>;
    loginsocial(data: any): Promise<(boolean | {
        access_token: string;
        user: UsersEntity;
    })[] | (boolean | {
        access_token: string;
        newUser: any;
    })[]>;
    randompass(data: any): Promise<any>;
    validateUser(user: any): Promise<any>;
    create(data: any): Promise<any[]>;
    findAll(): Promise<UsersEntity[]>;
    read(id: string): Promise<UsersEntity>;
    findid(id: string): Promise<UsersEntity>;
    findSDT(sdt: any): Promise<UsersEntity>;
    findbySDT(data: any): Promise<UsersEntity>;
    findbyEmail(data: any): Promise<UsersEntity>;
    findAdmin(): Promise<UsersEntity[]>;
    findQuery(params: any): Promise<{
        items: UsersEntity[];
        totalCount: number;
    }>;
    update(id: string, data: Partial<UpdateUserDto>): Promise<UsersEntity>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
    changepass(data: any): Promise<any>;
}
