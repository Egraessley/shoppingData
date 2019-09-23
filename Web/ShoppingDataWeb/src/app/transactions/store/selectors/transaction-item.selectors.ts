import { createSelector } from '@ngrx/store';
import { getTransactionState, TransactionState } from '../reducers';
import * as fromReducer from '../reducers/transaction-item.reducer';

export const getTransactionItemState = createSelector(
  getTransactionState,
  (state: TransactionState) => state.transactionItem
);

export const getCurrentTransactionItem = createSelector(
getTransactionItemState,
state=>state.currentTransaction
)