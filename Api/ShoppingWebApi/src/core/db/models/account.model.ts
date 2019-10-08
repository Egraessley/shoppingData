import {
    Column, Entity, PrimaryGeneratedColumn,
    ManyToMany,
    JoinTable,
    OneToOne,
    JoinColumn,
    OneToMany,
    ManyToOne
} from "typeorm";
import { Users } from "./user.model";

@Entity()
export class Accounts
{
    @PrimaryGeneratedColumn()
    id:number;

    @OneToMany(type => Users, user=>user.account)
    users: Users[];

    
}