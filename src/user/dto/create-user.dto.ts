import { IsArray, IsEmail, IsNotEmpty, IsString, Length, isString } from "class-validator";
import { Roles } from "../../role/roles.enum";


export class UserRegistrationDTO{
    
    @IsString()
    @IsNotEmpty()
    firstname: string;

    @IsString()
    @IsNotEmpty()
    lastname: string;

    @IsEmail()
    email: string;


    @Length(6,32)
    password: string;

    @IsString()
    @IsNotEmpty()
    role: Roles;

}