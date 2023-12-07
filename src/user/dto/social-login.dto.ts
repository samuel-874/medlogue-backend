

import { IsArray, IsEmail, IsEnum, IsNotEmpty, IsString, Length, isString } from "class-validator";
import { Roles } from "../../role/roles.enum";
import { Provider } from "../entity/user.enums";


export class SocialLoginUserDTO{
    
    @IsString()
    @IsNotEmpty()
    firstname: string;

    @IsString()
    @IsNotEmpty()
    lastname: string;

    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    role: Roles;

    @IsEnum(Provider)
    provider: Provider

}