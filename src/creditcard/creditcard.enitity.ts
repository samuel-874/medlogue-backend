import { User } from "src/user/entity/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CreditCard {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    cardNumber: string;

    @Column()
    cvv: number;

    @Column()
    exp: string;

    @Column()
    token: string;

    @ManyToOne(() => User, (user) => user.creditCards)
    user: User;
}