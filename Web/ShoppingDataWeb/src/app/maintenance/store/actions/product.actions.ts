import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { ProductCreateModel, ProductListModel, ProductUpdateModel } from '../../../shared/models';

export enum ProductListActions {
  ProductsRequested = '[View Product Page] ProductsRequested',
  ProductsRequestedFailed = '[View Product Page] ProductsRequestedFailed',
  ProductsLoaded = '[Product API] ProductsLoaded',
  ProductCreated = '[Product API] Product Created',
  ProductCreatedSuccess = '[Product API] Product Created Success',
  ProductCreatedFailed = '[Product API] Product Created Failed',
  ProductSaved = '[Product API] Product Saved',
  ProductSavedSuccess = '[Product API] Product Saved Success',
  ProductSavedFailed = '[Product API] Product Saved Failed',
  ProductDeleted = '[Product API] Product Deleted',
  ProductDeletedSuccess = '[Product API] Product Deleted Success',
  ProductDeletedFailed = '[Product API] Product Deleted Failed',
  ProductsRefreshed = '[View Product Page] Products Refreshed'
}

export class ProductsRefreshed implements Action {
  readonly type = ProductListActions.ProductsRefreshed;

  constructor() {}
}

export class ProductsRequested implements Action {
  readonly type = ProductListActions.ProductsRequested;

  constructor() {}
}

export class ProductsRequestedFailed implements Action {
  readonly type = ProductListActions.ProductsRequestedFailed;

  constructor(public payload: any) {}
}

export class ProductsLoaded implements Action {
  readonly type = ProductListActions.ProductsLoaded;

  constructor(public payload: {products: ProductListModel[]}) {}
}

export class ProductCreated implements Action {
  readonly type = ProductListActions.ProductCreated;

  constructor(public payload: {product: ProductCreateModel}) {}
}

export class ProductCreatedFailed implements Action {
  readonly type = ProductListActions.ProductCreatedFailed;

  constructor(public payload: any) {}
}

export class ProductCreatedSuccess implements Action {
  readonly type = ProductListActions.ProductCreatedSuccess;

  constructor(public payload: {product: ProductListModel}) {}
}

export class ProductSaved implements Action {
  readonly type = ProductListActions.ProductSaved;

  constructor(public payload: {product: ProductUpdateModel}) {}
}

export class ProductSavedFailed implements Action {
  readonly type = ProductListActions.ProductSavedFailed;

  constructor(public payload: any) {}
}

export class ProductSavedSuccess implements Action {
  readonly type = ProductListActions.ProductSavedSuccess;

  constructor(public payload: {product: Update<ProductListModel>}) {}
}

export class ProductDeleted implements Action {
  readonly type = ProductListActions.ProductDeleted;

  constructor(public payload: {id: number}) {}
}

export class ProductDeletedFailed implements Action {
  readonly type = ProductListActions.ProductDeletedFailed;

  constructor(public payload: any) {}
}

export class ProductDeletedSuccess implements Action {
  readonly type = ProductListActions.ProductDeletedSuccess;

  constructor(public payload: {id: number}) {}
}

export type ProductActions =
  | ProductsRequested
  | ProductsRequestedFailed
  | ProductsLoaded
  | ProductCreated 
  | ProductCreatedSuccess 
  | ProductCreatedFailed 
  | ProductSaved 
  | ProductSavedSuccess 
  | ProductSavedFailed 
  | ProductDeleted 
  | ProductDeletedSuccess 
  | ProductDeletedFailed 
  | ProductsRefreshed
