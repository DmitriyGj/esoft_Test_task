import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne, OneToMany, JoinTable, Relation, Unique } from "typeorm"
import { User_details } from './UserDetails.entity';
import { Role } from './Role.entity';

@Entity()
@Unique(['login'])

export class User {
    @PrimaryGeneratedColumn()
    user_id: number

    @Column()
    login: string

    @Column()
    password: string

    @ManyToOne(() => Role)
    @JoinColumn(
        { name: "role_id", referencedColumnName: "role_id" }
    )
    role: Relation<Role>

    @OneToOne(() => User_details)
    @JoinColumn(
        { name: "user_details_id", referencedColumnName: "user_details_id" }
    )
    user_details: Relation<User_details>
}