import { IsEnum, IsString } from "class-validator"
import { Status } from "../appointments.enums"

export class StatusDTO {

    @IsString()
    appointmentId: string

    @IsEnum({enum: Status})
    status: Status
}