import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Appointment } from "./appointment.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { AppointmentDTO } from "./appointment.dto";

@Injectable()
export class AppointmentService {

    constructor(
        @InjectRepository(Appointment)
         private appointmentRepository: Repository<Appointment> ) {}


    async bookSession( appointmentDTO: AppointmentDTO,   ) {

        const appointment = new Appointment();
        
    }
}