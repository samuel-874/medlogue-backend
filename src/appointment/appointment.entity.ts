import { User } from "src/user/entity/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Type, Protocol } from "./appointments.enums";
@Entity()
 export class Appointment {

      @PrimaryGeneratedColumn('uuid')
      id: string;

      @ManyToOne(() => User, (user) => user.sessions)
      user: User;

      @ManyToOne(() => User, (user) => user.appointments)
      doctor: User;

      @Column()
      time: string;

      @Column({ type: "date"})
      date: Date;

      @Column({ type: "enum", enum: Type, default: Type.ONLINE })
      type: Type;

      @Column()
      totalCharge: number;

      @Column({ type: "enum", enum: Protocol, default: Protocol.VOICE_CALL})
      protocol: Protocol

      @Column()
      address: string

      @Column()
      rememberMe: boolean

 }

