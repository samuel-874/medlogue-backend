import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtConstant } from "./auth.constant";
import { UserService } from "src/user/user.service";
import { Roles } from "src/role/roles.enum";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){

    constructor(private userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstant.secret
        });
    }

   async validate(
    payload: { email: string, sub: string, role: Roles }

    ){

       const user = await this.userService.findOne(payload.email);    
       if(!user || user.role !== payload.role ){
            throw new UnauthorizedException("Email on token is invalid Or modified token")
       }
       
        return user;
    }
}