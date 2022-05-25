import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne, OneToMany, JoinTable, Relation, Unique } from "typeorm"
import { User_details } from './UserDetails.entity';

@Entity()

export class User {
    @PrimaryGeneratedColumn()
    task_id: number

    @Column()
    title: string

    @Column()
    completed:boolean

    @Column({type:'date'})
    creation_date: string

    @Column({type:'date'})
    update_date: string

    @Column({type:'time with time zone'})
    start_date:Date

    @Column({type:'time with time zone'})
    end_date:Date

    @OneToOne(() => User_details)
    @JoinColumn({
        name:'executor_id', referencedColumnName:'executor_id'
    })
    executor:Relation<User_details>

    @OneToOne(() => User)
    @JoinColumn({
        name:'creator_id', referencedColumnName:'creator_id'
    })
    creator:Relation<User>

}