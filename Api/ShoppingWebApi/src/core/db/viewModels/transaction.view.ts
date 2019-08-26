import { orderItemView } from "./order-item.view";

export class TransactionView {
    id: number;
    items: orderItemView[];
    date: Date;
}