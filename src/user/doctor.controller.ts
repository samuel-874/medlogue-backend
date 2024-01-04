import { UserService } from "./user.service";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { RolesGuard } from "src/role/roles.guard";
import { HasRole } from "src/role/roles.decorator";
import { Roles } from "src/role/roles.enum";
import { 
    Controller, 
    UseGuards,
    Put,
    Body
    
 } from "@nestjs/common";
import { DoctorUpdateDTO } from "./dto/doctor-update.dto";


@UseGuards(JwtAuthGuard,RolesGuard)
@HasRole(Roles.DOCTOR)
@Controller("api/v1/doctors")
export class DoctorController {

    constructor( private userService: UserService ) {}

    
    @Put()
    updateProfile(
        @Body() updateDTO: DoctorUpdateDTO,
    ){
        return this.userService.updateDoctor(updateDTO)
    }   
}