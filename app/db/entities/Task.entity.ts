import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne, OneToMany, JoinTable, Relation, Unique } from "typeorm"
import { User_details } from './UserDetails.entity';
import { User } from './User.entity';

export enum Status{
    ToDo= "К выполнению",
    Doing = "Выполняется",
    Complete = "Выполнена",
    Cancel = "Отменена"
}

export enum Priority{
    Low = "Низкий",
    Medium = "Средний",
    High = "Высокий"
}

@Entity()

export class Task {
    @PrimaryGeneratedColumn()
    task_id: number

    @Column()
    title: string

    @Column({
        type:'enum',
        enum: Status,
        default: Status.ToDo
    })
    status:Status

    @Column({
        type:'enum',
        enum: Priority
    })
    priority:Priority

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
        name:'executor_id', referencedColumnName:'user_details_id'
    })
    executor:Relation<User_details>

    @OneToOne(() => User)
    @JoinColumn({
        name:'creator_id', referencedColumnName:'user_id'
    })
    creator:Relation<User>

}