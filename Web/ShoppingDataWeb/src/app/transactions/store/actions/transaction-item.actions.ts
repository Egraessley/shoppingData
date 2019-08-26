import { Action } from '@ngrx/store';
import { TransactionModel} from '../../../shared/models';

export enum TransactionItemListActions {
  TransactionItemRequested = '[View TransactionItem Page] TransactionItemRequested',
  TransactionItemRequestedFailed = '[View TransactionItem Page] TransactionItemsRequestedFailed',
  TransactionItemLoaded = '[TransactionItem API] TransactionItemsLoaded',
  TransactionItemCreated = '[TransactionItem API] TransactionItem Created',
  TransactionItemCreatedSuccess = '[TransactionItem API] TransactionItem Created Success',
  TransactionItemCreatedFailed = '[TransactionItem API] TransactionItem Created Failed',
  TransactionItemSaved = '[TransactionItem API] TransactionItem Saved',
  TransactionItemSavedSuccess = '[TransactionItem API] TransactionItem Saved Success',
  TransactionItemSavedFailed = '[TransactionItem API] TransactionItem Saved Failed',
  TransactionItemsRefreshed = '[View TransactionItem Page] TransactionItems Refreshed'
}

export class TransactionItemsRefreshed implements Action {
  readonly type = TransactionItemListActions.TransactionItemsRefreshed;

  constructor() {}
}

export class TransactionItemsRequested implements Action {
  readonly type = TransactionItemListActions.TransactionItemRequested;

  constructor(public payload: {id: number}) {}
}

export class TransactionItemsRequestedFailed implements Action {
  readonly type = TransactionItemListActions.TransactionItemRequestedFailed;

  constructor(public payload: any) {}
}

export class TransactionItemsLoaded implements Action {
  readonly type = TransactionItemListActions.TransactionItemLoaded;

  constructor(public payload: {transaction: TransactionModel}) {}
}

export class TransactionItemCreated implements Action {
  readonly type = TransactionItemListActions.TransactionItemCreated;

  constructor(public payload: {transaction: TransactionModel}) {}
}

export class TransactionItemCreatedFailed implements Action {
  readonly type = TransactionItemListActions.TransactionItemCreatedFailed;

  constructor(public payload: any) {}
}

export class TransactionItemCreatedSuccess implements Action {
  readonly type = TransactionItemListActions.TransactionItemCreatedSuccess;

  constructor(public payload: {transaction: TransactionModel}) {}
}

export class TransactionItemSaved implements Action {
  readonly type = TransactionItemListActions.TransactionItemSaved;

  constructor(public payload: {transaction: TransactionModel}) {}
}

export class TransactionItemSavedFailed implements Action {
  readonly type = TransactionItemListActions.TransactionItemSavedFailed;

  constructor(public payload: any) {}
}

export class TransactionItemSavedSuccess implements Action {
  readonly type = TransactionItemListActions.TransactionItemSavedSuccess;

  constructor(public payload: {transaction: TransactionModel}) {}
}

export type TransactionItemActions =
  | TransactionItemsRequested
  | TransactionItemsRequestedFailed
  | TransactionItemsLoaded
  | TransactionItemCreated 
  | TransactionItemCreatedSuccess 
  | TransactionItemCreatedFailed 
  | TransactionItemSaved 
  | TransactionItemSavedSuccess 
  | TransactionItemSavedFailed 
  | TransactionItemsRefreshed
