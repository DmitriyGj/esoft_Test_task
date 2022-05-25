import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import { User } from "./User.entity";

@Entity()
export class User_details {
    @PrimaryGeneratedColumn()
    user_details_id: number

    @Column()
    patronymic: string

    @Column()
    last_name:string
  
    @ManyToOne(() => User)
    @JoinColumn()
    supervisor: User
}