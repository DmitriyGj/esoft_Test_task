import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { user } from './User.entity';

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    role_id: number

    @Column()
    role_name: string


}