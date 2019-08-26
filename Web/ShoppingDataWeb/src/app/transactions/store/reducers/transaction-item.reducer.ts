import { TransactionModel, blankTransaction } from '../../../shared/models';
import * as fromTransactionActions from '../actions/transaction-item.actions';

export interface TransactionsItemState {
  currentTransaction: TransactionModel;
}

export const initialState: TransactionsItemState ={
  currentTransaction: blankTransaction
};

export function reducer(
  state = initialState,
  action: fromTransactionActions.TransactionItemActions
): TransactionsItemState {
  switch (action.type) {
    case fromTransactionActions.TransactionItemListActions.TransactionItemLoaded: {
      return {
          ...state,
          currentTransaction: action.payload.transaction
      }
    }
    case fromTransactionActions.TransactionItemListActions.TransactionItemRequestedFailed: {
      return {
        ...state,
        currentTransaction: blankTransaction
      };
    }
    case fromTransactionActions.TransactionItemListActions.TransactionItemSavedSuccess: {
      return {
        ...state,
        currentTransaction: action.payload.transaction
      };
    }
    case fromTransactionActions.TransactionItemListActions.TransactionItemCreatedSuccess: {
        return {
          ...state,
          currentTransaction: action.payload.transaction
        };
    }
    case fromTransactionActions.TransactionItemListActions.TransactionItemsRefreshed: {
      return {
        ...state,
        currentTransaction: blankTransaction
      };
    }
    default: {
      return state;
    }
  }
}
