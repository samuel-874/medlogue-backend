import { IsEmail, IsNumber, IsOptional, IsString } from "class-validator";


 export class CreditCardDTO {

    @IsString()
    @IsOptional()
    id?: string;

    @IsString()
    cardNumber: string;

    @IsString()
    cvv: number;

    @IsString()
    exp: string;

    @IsString()
    token: string;

    @IsEmail()
    email: string;
 }