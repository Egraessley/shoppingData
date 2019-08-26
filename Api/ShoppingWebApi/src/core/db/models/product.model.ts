import {
    Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn,
    UpdateDateColumn,
    OneToMany
} from "typeorm";
import { Brands } from "./brand.model";
import { Sections } from "./section.model";
import { Types } from "./type.model";
import { OrderItems } from "./orderItem.model";

@Entity()
export class Products
{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @ManyToOne(Type => Brands, brand=>brand.products)
    @JoinColumn()
    brand:Brands;

    @ManyToOne(Type => Sections, section=>section.products)
    @JoinColumn()
    section: Sections;

    @ManyToOne(type => Types, type=>type.products)
    @JoinColumn()
    type: Types;

    @OneToMany(type => OrderItems, item=>item.product)
    orderItems?:OrderItems[];

}