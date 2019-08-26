import { TagModel } from './tag.model';

export interface orderItemModel {
    id: number;
    productId: number;
    tags: TagModel[];
    quantity: number;
    price: number;
    transactionId: number;
}