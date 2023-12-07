import { Roles } from "src/role/roles.enum";
import { BloodGroup, Gender, Genotype, Provider } from "./user.enums";
import { 
    Column, 
    Entity, 
    CreateDateColumn, 
    PrimaryGeneratedColumn, 
} from "typeorm"


@Entity({ name: 'users' })
export class User{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column({ unique: true })
    email: string;

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

    // sessions: SESSIONS[]
}