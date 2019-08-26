import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { BrandModel } from '../../../shared/models';

export enum BrandListActions {
  BrandsRequested = '[View Brand Page] BrandsRequested',
  BrandsRequestedFailed = '[View Brand Page] BrandsRequestedFailed',
  BrandsLoaded = '[Brand API] BrandsLoaded',
  BrandCreated = '[Brand API] Brand Created',
  BrandCreatedSuccess = '[Brand API] Brand Created Success',
  BrandCreatedFailed = '[Brand API] Brand Created Failed',
  BrandSaved = '[Brand API] Brand Saved',
  BrandSavedSuccess = '[Brand API] Brand Saved Success',
  BrandSavedFailed = '[Brand API] Brand Saved Failed',
  BrandDeleted = '[Brand API] Brand Deleted',
  BrandDeletedSuccess = '[Brand API] Brand Deleted Success',
  BrandDeletedFailed = '[Brand API] Brand Deleted Failed',
  BrandsRefreshed = '[View Brand Page] Brands Refreshed'
}

export class BrandsRefreshed implements Action {
  readonly type = BrandListActions.BrandsRefreshed;

  constructor() {}
}

export class BrandsRequested implements Action {
  readonly type = BrandListActions.BrandsRequested;

  constructor() {}
}

export class BrandsRequestedFailed implements Action {
  readonly type = BrandListActions.BrandsRequestedFailed;

  constructor(public payload: any) {}
}

export class BrandsLoaded implements Action {
  readonly type = BrandListActions.BrandsLoaded;

  constructor(public payload: {brands: BrandModel[]}) {}
}

export class BrandCreated implements Action {
  readonly type = BrandListActions.BrandCreated;

  constructor(public payload: {brand: BrandModel}) {}
}

export class BrandCreatedFailed implements Action {
  readonly type = BrandListActions.BrandCreatedFailed;

  constructor(public payload: any) {}
}

export class BrandCreatedSuccess implements Action {
  readonly type = BrandListActions.BrandCreatedSuccess;

  constructor(public payload: {brand: BrandModel}) {}
}

export class BrandSaved implements Action {
  readonly type = BrandListActions.BrandSaved;

  constructor(public payload: {brand: BrandModel}) {}
}

export class BrandSavedFailed implements Action {
  readonly type = BrandListActions.BrandSavedFailed;

  constructor(public payload: any) {}
}

export class BrandSavedSuccess implements Action {
  readonly type = BrandListActions.BrandSavedSuccess;

  constructor(public payload: {brand: Update<BrandModel>}) {}
}

export class BrandDeleted implements Action {
  readonly type = BrandListActions.BrandDeleted;

  constructor(public payload: {id: number}) {}
}

export class BrandDeletedFailed implements Action {
  readonly type = BrandListActions.BrandDeletedFailed;

  constructor(public payload: any) {}
}

export class BrandDeletedSuccess implements Action {
  readonly type = BrandListActions.BrandDeletedSuccess;

  constructor(public payload: {id: number}) {}
}

export type BrandActions =
  | BrandsRequested
  | BrandsRequestedFailed
  | BrandsLoaded
  | BrandCreated 
  | BrandCreatedSuccess 
  | BrandCreatedFailed 
  | BrandSaved 
  | BrandSavedSuccess 
  | BrandSavedFailed 
  | BrandDeleted 
  | BrandDeletedSuccess 
  | BrandDeletedFailed
  | BrandsRefreshed
