import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne, OneToMany, JoinTable, Relation, Unique } from "typeorm"
import { User_details } from './UserDetails.entity';
import { User } from './User.entity';

export enum Status{
    "К выполнению" = `"К выполнению"`,
    "Выполняется" = '"Выполняется"',
    "Выполнена" = '"Выполнена"',
    "Отменена"= '"Отменена"'
}

export enum Priority{
    "Низкий" = '"Низкий"',
    "Средний" = '"Средний"',
    "Высокий" = '"Высокий"'
}

@Entity()

export class Task {
    @PrimaryGeneratedColumn()
    task_id: number

    @Column()
    title: string

    @Column()
    status:string

    @Column()
    priority:string

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

    @ManyToOne(() => User)
    @JoinColumn({
        name:'creator_id', referencedColumnName:'user_id'
    })
    creator:Relation<User>

}