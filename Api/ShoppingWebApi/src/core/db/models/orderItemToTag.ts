import {
    Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn
} from "typeorm";
import { Tags } from "./tag.model";
import { OrderItems } from "./orderItem.model";

@Entity()
export class OrderItemsToTag
{
    @PrimaryGeneratedColumn()
    id:number;

    @ManyToOne(type => Tags, mid=>mid.orderItems)
    @JoinColumn()
    tag:Tags;

    @ManyToOne(type => OrderItems, mid=>mid.tags)
    @JoinColumn()
    orderItem:OrderItems;
}