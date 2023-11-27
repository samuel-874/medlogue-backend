import { Body, Controller, Post, Request, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { UserRegistrationDTO } from 'src/user/dto/create-user.dto';
import { Response } from 'express';

@Controller('api/v1/auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('/login/user')
    async login(@Request() req) {

        return this.authService.login(req.user);
    }

    @Post('/register')
    createUser(
        @Body() userDTO: UserRegistrationDTO,
        @Res() response: Response,
         ){
        
        return this.authService.createUser(userDTO,response);
    }
    
}
