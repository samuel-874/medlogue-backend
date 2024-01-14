import { Module } from '@nestjs/common';
import { CreditcardService } from './creditcard.service';
import { UserModule } from 'src/user/user.module';
import { CreditCardController } from './creditcard.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreditCard } from './creditcard.enitity';

@Module({
  providers: [CreditcardService],
  imports: [UserModule, 
    TypeOrmModule.forFeature([CreditCard])],
  exports: [CreditcardService],
  controllers: [CreditCardController]
})
export class CreditcardModule {}
