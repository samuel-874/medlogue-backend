import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from './user/entity/user.entity';
import { AuthModule } from './auth/auth.module';
import { FiledataModule } from './filedata/filedata.module';
import { FileData } from './filedata/filedata.entity';
import { Appointment } from './appointment/appointment.entity';
import { CreditcardModule } from './creditcard/creditcard.module';



const  dotenv  = require('dotenv');

dotenv.config();

const {
   DB_PORT: port, 
   DB_USERNAME: username,
   DB_PASSWORD: password, 
   DB_DATABASE: database
  } = process.env;


@Module({
  imports: [
    UserModule,
  TypeOrmModule.forRoot({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [User,FileData,Appointment],
    synchronize: true,
    autoLoadEntities: true

  }),
  AuthModule,
  FiledataModule,
  CreditcardModule]
})
export class AppModule {}
