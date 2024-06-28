import { UsersService } from "../users.service";
declare const JwtStrategy_base: new (...args: any[]) => InstanceType<any>;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly _UsersService;
    constructor(_UsersService: UsersService);
    validate(payload: any): Promise<any>;
}
declare const JwtCustomStrategy_base: new (...args: any[]) => InstanceType<any>;
export declare class JwtCustomStrategy extends JwtCustomStrategy_base {
    private readonly _UsersService;
    constructor(_UsersService: UsersService);
    validate(payload: any): Promise<any>;
}
export {};
