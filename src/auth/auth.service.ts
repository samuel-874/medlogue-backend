import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from "@nestjs/jwt";
import { User } from 'src/user/entity/user.entity';
import { UserRegistrationDTO } from 'src/user/dto/create-user.dto';
import { Response } from 'express';
@Injectable()
export class AuthService {

    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        ) {}

    async validateUser( email: string, pass: string ){
        
        const user = await this.userService.findOne(email,true);
        
        if(user && user.password === pass){
            const { password, ...result } = user;
            return result;
        }

        return null;
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

        return this.userService.createUser(userDTO,response);
    }

}
