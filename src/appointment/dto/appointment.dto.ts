import { IsBoolean, IsDate, IsDateString, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { Protocol, Type } from "../appointments.enums";


 export class AppointmentDTO {

    @IsString()
    time: string;
    
    @IsDateString()
    date: Date;
    
    @IsEnum(Type)
    type: Type;
    
    @IsNumber()
    totalCharge: number;
    
    @IsEnum(Protocol)
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