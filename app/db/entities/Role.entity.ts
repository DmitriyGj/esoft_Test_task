import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { User } from './User.entity';

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    role_id: number

    @Column()
    role_name: string

    @OneToMany(() => User, user => user.role)
    employes:Role[]
}