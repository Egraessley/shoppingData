import {
    Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn,
    UpdateDateColumn,
    OneToMany
} from "typeorm";
import {type} from "os";
import { Products } from "./product.model";
import { Accounts } from "./account.model";

@Entity()
export class Brands
{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @OneToMany(type => Products, prod=>prod.brand)
    products?:Products[];

    @ManyToOne(type => Accounts)
    @JoinColumn()
    account: Accounts;
    
}