import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CreditcardService } from "./creditcard.service";
import { CreditCardDTO } from "./creditcard.dto";


@Controller("api/v1/creditcards")
export class CreditCardController {

    constructor(private creditCardService: CreditcardService) {}


    @Post()
    addCreditCard(@Body() creditCardDTO: CreditCardDTO){

        return this.creditCardService.addCreditCard(creditCardDTO)
    }

    @Put()
    updateCreditcard(@Body() creditcardDTO: CreditCardDTO){
        return this.creditCardService.updateCreditCard(creditcardDTO);
    }

    @Get(':id')
    getCreditcard(@Param('id') id: string){

        return this.creditCardService.getCreditcard(id)
    }

    @Delete(':id')
    deleteCreditcard(@Param('id') id: string){

        return this.creditCardService.deleteCreditCard(id)
    }
    
}