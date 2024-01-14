import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreditCard } from './creditcard.enitity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreditCardDTO } from './creditcard.dto';
import { UserService } from 'src/user/user.service';
import { customResponse } from 'src/general/service';

@Injectable()
export class CreditcardService {

    constructor(
        @InjectRepository(CreditCard)
        private creditCardRepo: Repository<CreditCard>,
        private userService: UserService
        ) {}

    async addCreditCard(creditCardDTO: CreditCardDTO){
        
        const creditcard = new CreditCard();
        creditcard.cardNumber = creditCardDTO.cardNumber;
        creditcard.cvv = creditCardDTO.cvv;
        creditcard.exp = creditCardDTO.exp;
        creditcard.token = creditCardDTO.token;

        const user = await this.userService.findOne(creditCardDTO.email,false);

        if(!user){

            throw new HttpException("Creditcard not found",404)
        }

        creditcard.user = user;

        this.creditCardRepo.save(creditcard);
        
      return customResponse(201,"Creditcard saved",null);
    }

    async updateCreditCard(creditCardDTO: CreditCardDTO){
       const creditcard  = await this.creditCardRepo.findOne({
        where: { id: creditCardDTO.id }
       });

       if(!creditcard){
            throw new HttpException("Creditcard not found",404);
       }

        creditcard.cardNumber = creditCardDTO.cardNumber;
        creditcard.cvv = creditCardDTO.cvv;
        creditcard.exp = creditCardDTO.exp;
        creditcard.token = creditCardDTO.token;

       this.creditCardRepo.save(creditcard)

        return customResponse(200,"CreditCard Updated",null)
    }

    async getCreditcard(id: string) {
        const creditcard  = await this.creditCardRepo.findOne({
            where: { id }
           });
    
        if(!creditcard){
             throw new HttpException("Creditcard not found",404);
        }

        return creditcard;
    }

    async deleteCreditCard(id: string) {

        const creditcard  = await this.creditCardRepo.findOne({
            where: { id }
           });
    
        if(!creditcard){
             throw new HttpException("Creditcard not found",404);
        }
        // TODO - tobe tested first
        await this.creditCardRepo.delete(id);

        return customResponse(200,"Creditcard Deleted",null);
    }


}
