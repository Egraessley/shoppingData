import {
    Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn,
    UpdateDateColumn,
    OneToMany
} from "typeorm";
import { Products } from "./product.model";
import { Accounts } from "./account.model";

@Entity()
export class Types
{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @OneToMany(type => Products, prod=>prod.type)
    products?:Products[];

    @ManyToOne(type=>Accounts)
    @JoinColumn()
    account: Accounts;
}