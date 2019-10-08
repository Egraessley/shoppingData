import {
    Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn,
    UpdateDateColumn,
    OneToMany
} from "typeorm";
import {type} from "os";
import { Products } from "./product.model";
import { Transactions } from "./transaction.model";
import { Accounts } from "./account.model";

@Entity()
export class Stores
{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @OneToMany(type => Transactions, trans=>trans.store)
    transactions?:Transactions[];

    @ManyToOne(type => Accounts)
    @JoinColumn()
    account: Accounts;
    
}