import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { BloodGroup, Gender, Genotype } from "../entity/user.enums"


export class UserUpdateDTO{

    @IsString()
    @IsNotEmpty()
    firstname: string;

    @IsString()
    @IsNotEmpty()
    lastname: string;

    @IsEmail()
    email: string;

    @IsString()
    @IsEnum(Gender)
    gender: Gender;

    @IsString()
    @IsNotEmpty()
    dateOfBirth: string

    @IsString()
    @IsEnum(Genotype)
    genotype: Genotype

    @IsString()
    @IsEnum(BloodGroup)
    bloodGroup: BloodGroup

    @IsNumber()
    height: number;

    @IsNumber()
    weight: number;

    @IsString()
    @IsOptional()
    profilePic: string;

}