import {
    Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn,
    UpdateDateColumn,
    OneToMany
} from "typeorm";
import {type} from "os";
import { Products } from "./product.model";

@Entity()
export class Sections
{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @OneToMany(type => Products, prod=>prod.section)
    products?:Products[];
}