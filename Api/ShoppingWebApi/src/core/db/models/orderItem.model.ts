import {
    Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn,
    UpdateDateColumn,
    OneToMany,
    ManyToMany
} from "typeorm";
import {type} from "os";
import { Products } from "./product.model";
import { OrderItemsToTag } from "./orderItemToTag";
import { Transactions } from "./transaction.model";

@Entity()
export class OrderItems
{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    quantity: number;

    @Column()
    price: number;

    @ManyToOne(type => Products, prod=>prod.orderItems)
    product:Products;

    @ManyToOne(type => Transactions, transaction=>transaction.items)
    @JoinColumn({referencedColumnName: 'id',name:'transactionId'})
    transaction:Transactions;

    @OneToMany(type=>OrderItemsToTag, tag=>tag.orderItem)
    tags: OrderItemsToTag[]
}