import { Roles } from "src/role/roles.enum";
import { BloodGroup, Gender, Genotype, Provider, Specialty } from "./user.enums";
import { 
    Column, 
    Entity, 
    CreateDateColumn, 
    PrimaryGeneratedColumn,
    ManyToOne,
    OneToMany, 
} from "typeorm"
import { Expose } from "class-transformer";
import { Appointment } from "src/appointment/appointment.entity";
import { CreditCard } from "src/creditcard/creditcard.enitity";



@Entity({ name: 'users' })
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column({ unique: true })
    email: string;

    @Column({ nullable: true, unique: true })
    mobile: string;

    @Column({ nullable: true})
    password: string;

    @Column({ nullable: true })
    dateOfBirth: string;

    @CreateDateColumn()
    registeredOn: string;

    @Column({ nullable: true })
    lastLogin: string;

    @Column({ nullable: true })
    genotype: Genotype;

    @Column({ nullable: true })
    bloodGroup: BloodGroup;

    @Column({ nullable: true })
    height: number;

    @Column({ nullable: true })
    weight: number;

    @Column({ type: 'enum', enum: Roles, default: Roles.PATIENT })
    role: Roles;

    @Column({ type: 'enum', enum: Gender,  default: Gender.UN_MENTIONED })
    gender: Gender;

    @Column({ type: 'enum', enum: Provider,  default: Provider.MEDLOGUE })
    provider: Provider

    @Column({ default: false })
    profileCompleted: boolean;

    // @ROLE Doctor
    @Column({ nullable: true })
    profilePic: string;

    @Column({ nullable: true })
    hospital: string;

    @Column({ default: 0 })
    hourlyCharge: number;

    @Column('simple-array',{ nullable: true})
    times: string[];

    @Column({ length: 2000, nullable: true })
    bio: string;

    @Column({  nullable: true })
    @Expose({ groups: ["doctor"]})
    specialty: Specialty | string;

    @Column({ default: true })
    isAvailable: boolean;
    
    @OneToMany(() => Appointment, (appointment) => appointment.doctor)
    appointments: Appointment[]
    
    @OneToMany(() => Appointment, (appointment) => appointment.patient)
    sessions: Appointment[]

    @OneToMany(() => CreditCard,(credit) => credit.user )
    creditCards: CreditCard[]
    
    // recomendedDoctors: Doctors[] ;
    // ratings: Rating[]
    // chats:[ Chat extend Message]
    // Calls: [Chat extend Message]
}