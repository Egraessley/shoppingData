import { Action } from '@ngrx/store';
import { TransactionListModel } from '../../../shared/models';

export enum TransactionListActions {
  TransactionsRequested = '[View Transaction Page] TransactionsRequested',
  TransactionsRequestedFailed = '[View Transaction Page] TransactionsRequestedFailed',
  TransactionsLoaded = '[Transaction API] TransactionsLoaded',
  TransactionsRefreshed = '[View Transaction Page] Transactions Refreshed'
}

export class TransactionsRefreshed implements Action {
  readonly type = TransactionListActions.TransactionsRefreshed;

  constructor() {}
}

export class TransactionsRequested implements Action {
  readonly type = TransactionListActions.TransactionsRequested;

  constructor() {}
}

export class TransactionsRequestedFailed implements Action {
  readonly type = TransactionListActions.TransactionsRequestedFailed;

  constructor(public payload: any) {}
}

export class TransactionsLoaded implements Action {
  readonly type = TransactionListActions.TransactionsLoaded;

  constructor(public payload: {transactions: TransactionListModel[]}) {}
}

export type TransactionActions =
  | TransactionsRequested
  | TransactionsRequestedFailed
  | TransactionsLoaded
  | TransactionsRefreshed
