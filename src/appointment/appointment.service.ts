import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Repository } from "typeorm";
import { Appointment } from "./appointment.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { AppointmentDTO } from "./dto/appointment.dto";
import { UserService } from "src/user/user.service";
import { User } from "src/user/entity/user.entity";
import { customResponse } from "src/general/service";
import { Status } from "./appointments.enums";
import { PaymentDTO } from "./dto/payment.dto";
import { StatusDTO } from "./dto/status.dto";

@Injectable()
export class AppointmentService {

    constructor(
        @InjectRepository(Appointment)
         private appointmentRepository: Repository<Appointment> ,
         private userService: UserService) {}


    async bookSession( appointmentDTO: AppointmentDTO, email: string) {

        const patient = await this.userService.findOne(email);
        const doctor = await this.userService.findOne(appointmentDTO.doctorsEmail);

        if(!doctor || !patient){
            throw new UnauthorizedException("Doctor or Patient not found");
        }

        const appointment = new Appointment();
        appointment.patient = patient;
        appointment.doctor = doctor;
        appointment.time = appointmentDTO.time;
        appointment.date = appointmentDTO.date
        appointment.type = appointmentDTO.type
        appointment.totalCharge = appointmentDTO.totalCharge
        appointment.protocol = appointmentDTO.protocol
        appointment.address = appointmentDTO.address
        appointment.preferedLocation = appointmentDTO.preferedLocation
        appointment.rememberMe = appointmentDTO.rememberMe

        const response = await this.appointmentRepository.save(appointment);


        return customResponse(
            200,
            "Appointment Booked Successfully",
            response
        )
    }


    async verifyPayment(paymentRequest: PaymentDTO){

        const appointment = await this.appointmentRepository.findOne({
            where: { id: paymentRequest?.appointmentId }
        })

        if(!appointment){
            throw new UnauthorizedException(`Appointment not found with id: ${paymentRequest?.appointmentId}`)
        }
        
        if(!paymentRequest?.paymentReference){
            throw new UnauthorizedException(`No payment reference`)
        }

        appointment.hasPaid = true
        appointment.paymentReference = paymentRequest.paymentReference
        appointment.paymentMethod = paymentRequest.paymentMethod

        this.appointmentRepository.save(appointment);

        return customResponse(
            200,
            "Payment verified successfully",
            appointment
        )
    }

    async updateOrderStatus({appointmentId, status}: StatusDTO){

        const appointment = await this.appointmentRepository.findOne({
            where: { id: appointmentId }
        })

        if(!appointment){
            throw new UnauthorizedException(`Appointment not found with id: ${appointmentId}`)
        }

        appointment.status = status;

        await this.appointmentRepository.save(appointment);

        return customResponse (
            200,
            "Payment verified successfully",
            appointment
        )
    }




}