import { Module } from "@nestjs/common";
import { AppointmentService } from "./appointment.service";
import { UserModule } from "src/user/user.module";
import { AppointmentController } from './appointment.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Appointment } from "./appointment.entity";


 @Module({
    providers: [AppointmentService],
    imports: [ UserModule, TypeOrmModule.forFeature([Appointment]) ],
    controllers: [AppointmentController],
    

 })
 export class AppointmentModule {}