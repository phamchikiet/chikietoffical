import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsergroupService } from 'src/usergroup/usergroup.service';
export declare class UsersController {
    private readonly usersService;
    private _UsergroupService;
    constructor(usersService: UsersService, _UsergroupService: UsergroupService);
    login(user: any): any;
    randompass(dulieu: any): any;
    getProfile(req: any): Promise<false | import("./entities/user.entity").UsersEntity>;
    create(createUserDto: CreateUserDto): Promise<any[]>;
    checksocial(data: any): Promise<void>;
    findAll(): Promise<import("./entities/user.entity").UsersEntity[]>;
    findOne(id: string): Promise<import("./entities/user.entity").UsersEntity>;
    findid(id: string): Promise<import("./entities/user.entity").UsersEntity>;
    findSDT(sdt: string): Promise<import("./entities/user.entity").UsersEntity>;
    findAdmin(): Promise<import("./entities/user.entity").UsersEntity[]>;
    findQuery(SearchParams: any): Promise<{
        items: import("./entities/user.entity").UsersEntity[];
        totalCount: number;
    }>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<import("./entities/user.entity").UsersEntity>;
    changepass(data: any): Promise<any>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
}
