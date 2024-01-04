import { IsBoolean, IsDate, IsEnum, IsNumber, IsString } from "class-validator";
import { Protocol, Type } from "./appointments.enums";


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
    address: string
 
    @IsBoolean()
    rememberMe: boolean
    
 }