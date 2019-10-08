import {
    Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn,
    UpdateDateColumn,
    OneToMany
} from "typeorm";
import {type} from "os";
import { Products } from "./product.model";
import { OrderItems } from "./orderItem.model";
import { OrderItemsToTag } from "./orderItemToTag";
import { Accounts } from "./account.model";
import { Stores } from "./Store.model";

@Entity()
export class Transactions
{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    date:Date;

    @OneToMany(type => OrderItems, prod=>prod.transaction)
    items:OrderItems[];

    @ManyToOne(type=>Stores, store=>store.transactions)
    @JoinColumn()
    store: Stores

    @ManyToOne(type=>Accounts)
    @JoinColumn()
    account: Accounts;
}