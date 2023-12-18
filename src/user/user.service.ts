import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "./entity/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRegistrationDTO } from "./dto/create-user.dto";
import { customResponse } from "src/general/service";
import { Request, Response } from "express";
import * as bcrypt from 'bcrypt';
import { UserUpdateDTO } from "./dto/update-profile.dto";
import { SocialLoginUserDTO } from "./dto/social-login.dto";

@Injectable()
export class UserService {
    constructor(

        @InjectRepository(User)
       private userRepository: Repository<User>,
       ) {}


    async getUserById(id: number,response: Response){
        
        const user = await this.userRepository.findOne({
            where: { id }
        })
       
        if(!user){
            console.log("Error: not found");
           return response.status(404).send(customResponse(404,"User not found", null));
        }

        return response.status(200).send(
            customResponse(200,"User retrieved successfully",user))  
    }


    async findOne(email: string, login?: boolean){
        const user = await this.userRepository.findOne({
            where: { email }
        });

        if(!user){

            throw new UnauthorizedException("Email has not been registered")
        }

        if(login){
           user.lastLogin = new Date().toString();
           this.userRepository.save(user); 
        }


        return user;
    }


  
   async createUser(reqDTO: UserRegistrationDTO, res: Response){
        const existingUserWithEmail = await this.userRepository.exist({
            where: {email: reqDTO.email}
        })

        if(existingUserWithEmail){
           return res.status(403).send(
            customResponse(403,"Email has been taken",null));
        }

        reqDTO.password = await bcrypt.hash(reqDTO.password, await bcrypt.genSalt())

        const user = await this.userRepository.save(reqDTO);
        return  res.status(201).send(
            customResponse(201,"User Registered Successfully",user));
    }

    async socialLogin(reqDTO: SocialLoginUserDTO){
        const existingUserWithEmail = await this.userRepository.findOne({
            where: {email: reqDTO.email}
        })

        if(existingUserWithEmail){
            
            if(existingUserWithEmail.provider === reqDTO.provider && existingUserWithEmail.role === reqDTO.role){
                existingUserWithEmail.lastLogin = new Date().toString();
               return await this.userRepository.save(existingUserWithEmail);
            }

            throw new UnauthorizedException("Email has been taken")
        }

        return await this.userRepository.save(reqDTO);
    }


   async updateUser( updateDTO: UserUpdateDTO ){


        const user = await this.userRepository.findOne({
                where: { email: updateDTO.email }
        })

        if(!user){
           throw new UnauthorizedException("Email was not recognized");
        }

        user.dateOfBirth = updateDTO.dateOfBirth;
        user.genotype = updateDTO.genotype;
        user.bloodGroup = updateDTO.bloodGroup;
        user.height = updateDTO.height;
        user.gender = updateDTO.gender;
        user.weight = updateDTO.weight
        user.firstname = updateDTO.firstname
        user.lastname = updateDTO.lastname
        user.profileCompleted = true

        this.userRepository.save(user);

        return customResponse(200,"Update was successfully",user);
   }

    test(){
        return { "message": "worksWell"}
    }
    
}