import {
    Column, Entity, PrimaryGeneratedColumn,
    ManyToMany,
    JoinTable,
    OneToMany,
    ManyToOne,
    JoinColumn
} from "typeorm";
import { Accounts } from "./account.model";
import { type } from "os";

@Entity()
export class Users
{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    userName:string;

    @Column()
    email:string;

    @Column()
    password: string;

    @Column()
    isAdmin: boolean;

    @Column()
    isSuper: boolean;

    @ManyToOne(type => Accounts, acc=>acc.users)
    @JoinColumn()
    account: Accounts;


    
}