import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { TypeModel } from '../../../shared/models';

export enum TypeListActions {
  TypesRequested = '[View Type Page] TypesRequested',
  TypesRequestedFailed = '[View Type Page] TypesRequestedFailed',
  TypesLoaded = '[Type API] TypesLoaded',
  TypeCreated = '[Type API] Type Created',
  TypeCreatedSuccess = '[Type API] Type Created Success',
  TypeCreatedFailed = '[Type API] Type Created Failed',
  TypeSaved = '[Type API] Type Saved',
  TypeSavedSuccess = '[Type API] Type Saved Success',
  TypeSavedFailed = '[Type API] Type Saved Failed',
  TypeDeleted = '[Type API] Type Deleted',
  TypeDeletedSuccess = '[Type API] Type Deleted Success',
  TypeDeletedFailed = '[Type API] Type Deleted Failed',
  TypesRefreshed = '[View Type Page] Types Refreshed'
}

export class TypesRefreshed implements Action {
  readonly type = TypeListActions.TypesRefreshed;

  constructor() {}
}

export class TypesRequested implements Action {
  readonly type = TypeListActions.TypesRequested;

  constructor() {}
}

export class TypesRequestedFailed implements Action {
  readonly type = TypeListActions.TypesRequestedFailed;

  constructor(public payload: any) {}
}

export class TypesLoaded implements Action {
  readonly type = TypeListActions.TypesLoaded;

  constructor(public payload: {types: TypeModel[]}) {}
}

export class TypeCreated implements Action {
  readonly type = TypeListActions.TypeCreated;

  constructor(public payload: {type: TypeModel}) {}
}

export class TypeCreatedFailed implements Action {
  readonly type = TypeListActions.TypeCreatedFailed;

  constructor(public payload: any) {}
}

export class TypeCreatedSuccess implements Action {
  readonly type = TypeListActions.TypeCreatedSuccess;

  constructor(public payload: {type: TypeModel}) {}
}

export class TypeSaved implements Action {
  readonly type = TypeListActions.TypeSaved;

  constructor(public payload: {type: TypeModel}) {}
}

export class TypeSavedFailed implements Action {
  readonly type = TypeListActions.TypeSavedFailed;

  constructor(public payload: any) {}
}

export class TypeSavedSuccess implements Action {
  readonly type = TypeListActions.TypeSavedSuccess;

  constructor(public payload: {type: Update<TypeModel>}) {}
}

export class TypeDeleted implements Action {
  readonly type = TypeListActions.TypeDeleted;

  constructor(public payload: {id: number}) {}
}

export class TypeDeletedFailed implements Action {
  readonly type = TypeListActions.TypeDeletedFailed;

  constructor(public payload: any) {}
}

export class TypeDeletedSuccess implements Action {
  readonly type = TypeListActions.TypeDeletedSuccess;

  constructor(public payload: {id: number}) {}
}

export type TypeActions =
  | TypesRequested
  | TypesRequestedFailed
  | TypesLoaded
  | TypeCreated 
  | TypeCreatedSuccess 
  | TypeCreatedFailed 
  | TypeSaved 
  | TypeSavedSuccess 
  | TypeSavedFailed 
  | TypeDeleted 
  | TypeDeletedSuccess 
  | TypeDeletedFailed 
  | TypesRefreshed
