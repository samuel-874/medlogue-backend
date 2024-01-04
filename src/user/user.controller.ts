import { UserService } from './user.service';
import { UserRegistrationDTO } from './dto/create-user.dto';
import { Request, Response } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { HasRole } from 'src/role/roles.decorator';
import { Roles } from 'src/role/roles.enum';
import { RolesGuard } from 'src/role/roles.guard';
import { UserUpdateDTO } from './dto/user-update.dto';
import { Get, 
        Req, 
        Res, 
        Body, 
        Post, 
        Param, 
        UseGuards,
        Controller,
        Put,
     } from '@nestjs/common';


@UseGuards(JwtAuthGuard,RolesGuard)
// @HasRole(Roles.ADMIN,Roles.PATIENT)
@Controller('/api/v1/users')
export class UserController {

    constructor(private userService: UserService) {}

   
    @Get("/me")
    getUserDetails(
        @Req() request: Request
    ){
        return request.user;
    }

    @Put()
    updateProfile(
        @Body() updateDTO: UserUpdateDTO,
    ){
        return this.userService.updateUser(updateDTO)
    }
    
    
    @Get('/doctors')
    async getAvailableDoctors(){        
       return this.userService.getDoctors();
    }
    
    @Get('/:id')
    async getUser(
       @Param('id') userId: number, 
       @Res() response: Response,
    ){        
       return this.userService.getUserById(userId,response);
    }



     

}
