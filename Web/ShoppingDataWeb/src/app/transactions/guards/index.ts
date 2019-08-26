import { TransactionListGuard } from './transaction list/transaction-list.guard';
import { TransactionItemGuard } from './transaction-item/transaction-item.guard';

export const transactionGuards: any[] = [
    TransactionListGuard,
    TransactionItemGuard
];

export * from './transaction list/transaction-list.guard';
export * from './transaction-item/transaction-item.guard';