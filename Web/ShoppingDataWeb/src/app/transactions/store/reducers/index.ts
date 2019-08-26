import {
    Action,
    ActionReducerMap,
    createFeatureSelector,
    createSelector,
  } from '@ngrx/store';
  import * as fromList from './transaction-list.reducer';
  import * as fromItem from './transaction-item.reducer';


export interface TransactionState {
    transactionList: fromList.TransactionsListState;
    transactionItem: fromItem.TransactionsItemState;
}

export const reducers: ActionReducerMap<TransactionState> = {
    transactionList: fromList.reducer,
    transactionItem: fromItem.reducer
}

export const initialState: TransactionState = {
    transactionItem: fromItem.initialState,
    transactionList: fromList.initialState
}

export const getTransactionState = createFeatureSelector<TransactionState>(
  'transactions'
);
  
export function TransactionReducer(
  state = initialState,
  action: Action
): TransactionState {
  switch (action.type) {
    default:
      return state;
  }
}