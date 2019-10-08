import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { StoreModel } from '../../../shared/models';

export enum StoreListActions {
  StoresRequested = '[View Store Page] StoresRequested',
  StoresRequestedFailed = '[View Store Page] StoresRequestedFailed',
  StoresLoaded = '[Store API] StoresLoaded',
  StoreCreated = '[Store API] Store Created',
  StoreCreatedSuccess = '[Store API] Store Created Success',
  StoreCreatedFailed = '[Store API] Store Created Failed',
  StoreSaved = '[Store API] Store Saved',
  StoreSavedSuccess = '[Store API] Store Saved Success',
  StoreSavedFailed = '[Store API] Store Saved Failed',
  StoreDeleted = '[Store API] Store Deleted',
  StoreDeletedSuccess = '[Store API] Store Deleted Success',
  StoreDeletedFailed = '[Store API] Store Deleted Failed',
  StoresRefreshed = '[View Store Page] Stores Refreshed'
}

export class StoresRefreshed implements Action {
  readonly type = StoreListActions.StoresRefreshed;

  constructor() {}
}

export class StoresRequested implements Action {
  readonly type = StoreListActions.StoresRequested;

  constructor() {}
}

export class StoresRequestedFailed implements Action {
  readonly type = StoreListActions.StoresRequestedFailed;

  constructor(public payload: any) {}
}

export class StoresLoaded implements Action {
  readonly type = StoreListActions.StoresLoaded;

  constructor(public payload: {stores: StoreModel[]}) {}
}

export class StoreCreated implements Action {
  readonly type = StoreListActions.StoreCreated;

  constructor(public payload: {store: StoreModel}) {}
}

export class StoreCreatedFailed implements Action {
  readonly type = StoreListActions.StoreCreatedFailed;

  constructor(public payload: any) {}
}

export class StoreCreatedSuccess implements Action {
  readonly type = StoreListActions.StoreCreatedSuccess;

  constructor(public payload: {store: StoreModel}) {}
}

export class StoreSaved implements Action {
  readonly type = StoreListActions.StoreSaved;

  constructor(public payload: {store: StoreModel}) {}
}

export class StoreSavedFailed implements Action {
  readonly type = StoreListActions.StoreSavedFailed;

  constructor(public payload: any) {}
}

export class StoreSavedSuccess implements Action {
  readonly type = StoreListActions.StoreSavedSuccess;

  constructor(public payload: {store: Update<StoreModel>}) {}
}

export class StoreDeleted implements Action {
  readonly type = StoreListActions.StoreDeleted;

  constructor(public payload: {id: number}) {}
}

export class StoreDeletedFailed implements Action {
  readonly type = StoreListActions.StoreDeletedFailed;

  constructor(public payload: any) {}
}

export class StoreDeletedSuccess implements Action {
  readonly type = StoreListActions.StoreDeletedSuccess;

  constructor(public payload: {id: number}) {}
}

export type StoreActions =
  | StoresRequested
  | StoresRequestedFailed
  | StoresLoaded
  | StoreCreated 
  | StoreCreatedSuccess 
  | StoreCreatedFailed 
  | StoreSaved 
  | StoreSavedSuccess 
  | StoreSavedFailed 
  | StoreDeleted 
  | StoreDeletedSuccess 
  | StoreDeletedFailed
  | StoresRefreshed
