import { TransactionListModel } from '../../../shared/models';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as fromTransactionActions from '../actions/transaction-list.actions';

export interface TransactionsListState extends EntityState<TransactionListModel> {
  allTransactionsLoaded: boolean;
}

export function sortByName(transaction1: TransactionListModel, transaction2: TransactionListModel) {
  return `${transaction1.date}`.localeCompare(`${transaction2.date}`);
}

export const adapter: EntityAdapter<TransactionListModel> = createEntityAdapter<
  TransactionListModel
>({
  sortComparer: sortByName,
});

export const initialState: TransactionsListState = adapter.getInitialState({
  allTransactionsLoaded: false,
});

export function reducer(
  state = initialState,
  action: fromTransactionActions.TransactionActions
): TransactionsListState {
  switch (action.type) {
    case fromTransactionActions.TransactionListActions.TransactionsLoaded: {
      return adapter.addAll(action.payload.transactions, {
        ...state,
        allTransactionsLoaded: true,
      });
    }
    case fromTransactionActions.TransactionListActions.TransactionsRequestedFailed: {
      return {
        ...state,
        allTransactionsLoaded: false,
      };
    }
    case fromTransactionActions.TransactionListActions.TransactionsRefreshed: {
      return {
        ...state,
        allTransactionsLoaded: false,
      };
    }
    default: {
      return state;
    }
  }
}

export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal,
} = adapter.getSelectors();
