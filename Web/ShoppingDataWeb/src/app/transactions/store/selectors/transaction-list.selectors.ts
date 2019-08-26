import { createSelector } from '@ngrx/store';
import { getTransactionState, TransactionState } from '../reducers';
import * as fromReducer from '../reducers/transaction-list.reducer';

export const getTransactionListState = createSelector(
  getTransactionState,
  (state: TransactionState) => state.transactionList
);

export const getTransactionListEntities  = createSelector(
    getTransactionListState,
    fromReducer.selectAll
)

export const getTransactionListEntitiesLoaded = createSelector(
getTransactionListState,
state=>state.allTransactionsLoaded
)