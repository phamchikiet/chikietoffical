import { UsersService } from '../users.service';
declare const LocalStrategy_base: new (...args: any[]) => any;
export declare class LocalStrategy extends LocalStrategy_base {
    private _UsersService;
    constructor(_UsersService: UsersService);
    validate(user: any): Promise<any>;
}
export {};
