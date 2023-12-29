import { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class FileData {

    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    dateCreated: Date;

    @Column()
    name: string;

    @Column()
    type: string;

    @Column()
    size: number;
}