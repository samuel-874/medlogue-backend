import { Module } from "@nestjs/common";
import { AppointmentService } from "./appointment.service";
import { UserModule } from "src/user/user.module";
import { AppointmentController } from './appointment.controller';


 @Module({
    providers: [AppointmentService],
    imports: [ UserModule ],
    controllers: [AppointmentController],
    

 })
 class AppointmentModule {}