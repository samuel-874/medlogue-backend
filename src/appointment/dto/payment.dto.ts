import { IsString } from "class-validator"


export class PaymentDTO {

    @IsString()
    appointmentId: string;

    @IsString()
    paymentReference: string

    @IsString()
    paymentMethod: string;
}