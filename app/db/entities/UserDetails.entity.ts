import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import { user } from "./User.entity";

@Entity()
export class User_details {
    @PrimaryGeneratedColumn()
    user_details_id: number

    @Column()
    patronymic: string

    @Column()
    last_name:string
  
    @ManyToOne(() => user)
    @JoinColumn()
    supervisor: user
}