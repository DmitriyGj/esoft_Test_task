import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne, Relation } from "typeorm";
import { User } from "./User.entity";

@Entity()
export class User_details {
    @PrimaryGeneratedColumn()
    user_details_id: number

    @Column()
    name:string

    @Column()
    patronymic: string

    @Column()
    last_name:string
  
    @ManyToOne(()=> User, user => user.user_details, {nullable:true})
    @JoinColumn({
        name:'supervisor_id',referencedColumnName:'user_id'
    })
    supervisor: Relation<User>
}