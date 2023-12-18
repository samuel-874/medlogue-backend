import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from "@nestjs/jwt";
import { User } from 'src/user/entity/user.entity';
import { UserRegistrationDTO } from 'src/user/dto/create-user.dto';
import { Response } from 'express';
import * as bcrypt from "bcrypt"
import { SocialLoginUserDTO } from 'src/user/dto/social-login.dto';
import { Provider } from 'src/user/entity/user.enums';
@Injectable()
export class AuthService {

    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        ) {}

    async validateUser( email: string, pass: string ){
        
        const user = await this.userService.findOne(email,true);
        if(user.provider !== Provider.MEDLOGUE){

          throw new UnauthorizedException(`User registered vai ${user.provider} and does not have a password`)
        }
        const isMatch = await bcrypt.compare(pass,user.password);        
        if(user && isMatch){
            const { password, ...result } = user;
            return result;
        }else{
          throw new UnauthorizedException("Password is not correct")
        }

    }

    async login(user: User) {
        const createdOn = new Date();

        const payload = { sub: createdOn.getTime(), email: user.email, role: user.role };
        return {
          access_token: this.jwtService.sign(payload),
        }
    }

    async createUser(
        userDTO: UserRegistrationDTO,
        response: Response,
        ) {
            const createdOn = new Date();

          const res = await this.userService.createUser(userDTO,response);
          if(res.statusCode >= 400 ){
            
            return res;
          }
          
            
            const payload = { sub: createdOn.getTime(), email: userDTO.email, role: userDTO.role };
            return {
              access_token: this.jwtService.sign(payload),
            }
    }

    async socialLogin(
        userDTO: SocialLoginUserDTO,
        ) {
            const createdOn = new Date();

         await this.userService.socialLogin(userDTO);
    
            const payload = { sub: createdOn.getTime(), email: userDTO.email, role: userDTO.role };
            return {
              access_token: this.jwtService.sign(payload),
            }
    }

}
