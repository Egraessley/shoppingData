import { TagView } from './tag.view';

export class orderItemView {
    id: number;
    productId: number;
    tags: TagView[];
    quantity: number;
    price: number;
    transactionId: number;
}