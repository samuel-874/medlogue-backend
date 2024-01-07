import { Module } from '@nestjs/common';
import { CreditcardService } from './creditcard.service';
import { UserModule } from 'src/user/user.module';
import { CreditCardController } from './creditcard.controller';

@Module({
  providers: [CreditcardService],
  imports: [UserModule],
  controllers: [CreditCardController]
})
export class CreditcardModule {}
