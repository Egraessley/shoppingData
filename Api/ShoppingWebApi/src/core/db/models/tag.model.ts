import {
    Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn,
    UpdateDateColumn,
    OneToMany
} from "typeorm";
import {type} from "os";
import { OrderItemsToTag } from "./orderItemToTag";
import { Accounts } from "./account.model";

@Entity()
export class Tags
{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @OneToMany(type=>OrderItemsToTag, item=>item.tag)
    orderItems?: OrderItemsToTag;

    @ManyToOne(type=>Accounts)
    @JoinColumn()
    account: Accounts;
}