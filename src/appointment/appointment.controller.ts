import { Body, Controller, Patch, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentDTO } from './dto/appointment.dto';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/role/roles.guard';
import { HasRole } from 'src/role/roles.decorator';
import { Roles } from 'src/role/roles.enum';
import { PaymentDTO } from './dto/payment.dto';
import { StatusDTO } from './dto/status.dto';

@Controller('api/v1/appointment')
@HasRole(Roles.PATIENT,Roles.ADMIN)
@UseGuards(JwtAuthGuard,RolesGuard)
export class AppointmentController {

    constructor( private appointmentService: AppointmentService) {}


    @Post('/book-session')
    bookAppointment(@Body() appointmentDTO: AppointmentDTO, @Req() request: any){
        return this.appointmentService.bookSession(appointmentDTO, request.user?.email)
    }

    @Put('/verify-payment')
    verifyPayment(@Body() paymentDTO: PaymentDTO ){
        return this.appointmentService.verifyPayment(paymentDTO)
    }

    @Patch('/status-update')
    updateAppointmentStatus(@Body() statusDTO: StatusDTO){
        return this.appointmentService.updateOrderStatus(statusDTO)
    }


}
