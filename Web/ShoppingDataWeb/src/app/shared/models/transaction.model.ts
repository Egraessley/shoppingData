import { orderItemModel } from './order-item.model';
import * as moment from 'moment';

export interface TransactionModel {
    id: number;
    items: orderItemModel[];
    date: Date;
}

export const blankTransaction: TransactionModel = {
    id: 0,
    items: [],
    date: moment().toDate()
}