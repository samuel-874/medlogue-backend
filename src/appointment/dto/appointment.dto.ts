import { IsBoolean, IsDate, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { Protocol, Type } from "../appointments.enums";


 export class AppointmentDTO {

    @IsString()
    time: string;
    
    @IsDate()
    date: Date;
    
    @IsEnum({ enum: Type})
    type: Type;
    
    @IsNumber()
    totalCharge: number;
    
    @IsEnum({ enum: Protocol})
    protocol: Protocol
    
    @IsString()
    @IsOptional()
    address: string;

    @IsString()
    @IsOptional()
    preferedLocation: string;

    
 
    @IsBoolean()
    rememberMe: boolean;

    @IsString()
    doctorsEmail: string;

    @IsString()
    @IsOptional()
    usersEmail: string;
    
 }