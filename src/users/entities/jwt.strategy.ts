import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { UsersService } from "../users.service";
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,'websitetoken') {
    constructor (private readonly _UsersService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: "websitetoken"
        });
    }
    async validate(payload: any) {
       const data = await this._UsersService.findbyEmail(payload);
    //    console.log(data);
       payload.roles = data?.Role
        // console.error('payload1',payload);
        return payload;  
      }
    // async validate(user:User): Promise<any> {
    //     const data = await this.authService.validateUser(user);
    //     if (!data) {
    //       throw new UnauthorizedException();
    //     }
    //     return data;
    //   }
}
// @Injectable()
// export class JwtCustomStrategy extends PassportStrategy(Strategy,'websitetoken') {
//     constructor (private readonly _UsersService: UsersService) {
//         super({
//             jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//             ignoreExpiration: false,
//             secretOrKey: "websitetoken"
//         });
//     }
//     async validate(payload: any) {
//          console.error('payload',payload);
//         return payload;        
//       }
//     // async validate(user:User): Promise<any> {
//     //     const data = await this.authService.validateUser(user);
//     //     if (!data) {
//     //       throw new UnauthorizedException();
//     //     }
//     //     return data;
//     //   }
// }
