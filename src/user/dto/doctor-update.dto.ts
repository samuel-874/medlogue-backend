import { IsArray, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { BloodGroup, Gender, Genotype, Specialty } from "../entity/user.enums"


export class DoctorUpdateDTO{

    @IsString()
    @IsNotEmpty()
    firstname: string;

    @IsString()
    @IsNotEmpty()
    lastname: string;

    @IsEmail()
    email: string;

    @IsString()
    @IsEnum(Specialty)
    specialty: Specialty;

    @IsString()
    @IsOptional()
    profilePic: string;

    @IsString()
    @IsNotEmpty()
    hospital: string;

    @IsString()
    @IsNotEmpty()
    bio: string;

    @IsNumber()
    @IsNotEmpty()
    charge: number;

    @IsArray()
    times: string[]

}