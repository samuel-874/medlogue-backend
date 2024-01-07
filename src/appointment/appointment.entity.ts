import { User } from "src/user/entity/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Type, Protocol, Status } from "./appointments.enums";
@Entity()
 export class Appointment {

      @PrimaryGeneratedColumn('uuid')
      id: string;

      @ManyToOne(() => User, (user) => user.sessions)
      patient: User;

      @ManyToOne(() => User, (user) => user.appointments)
      doctor: User;

      @Column()
      time: string;

      @CreateDateColumn()
      dateBooked: Date;

      @Column({ type: "date"})
      date: Date;

      @Column({ type: "enum", enum: Type, default: Type.ONLINE })
      type: Type;

      @Column()
      totalCharge: number;

      @Column({ type: "enum", enum: Protocol, default: Protocol.VOICE_CALL})
      protocol: Protocol

      @Column()
      address: string;
      
      @Column()
      preferedLocation: string;

      @Column()
      rememberMe: boolean;

      @Column({ type: "enum", enum: Status, default: Status.UN_COMPLETED })
      status: Status;

      @Column()
      hasPaid: boolean;

      @Column({ nullable: true })
      paymentReference: string;

      @Column({ nullable: true})
      paymentMethod: string;

 }

