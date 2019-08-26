import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { SectionModel } from '../../../shared/models';

export enum SectionListActions {
  SectionsRequested = '[View Section Page] SectionsRequested',
  SectionsRequestedFailed = '[View Section Page] SectionsRequestedFailed',
  SectionsLoaded = '[Section API] SectionsLoaded',
  SectionCreated = '[Section API] Section Created',
  SectionCreatedSuccess = '[Section API] Section Created Success',
  SectionCreatedFailed = '[Section API] Section Created Failed',
  SectionSaved = '[Section API] Section Saved',
  SectionSavedSuccess = '[Section API] Section Saved Success',
  SectionSavedFailed = '[Section API] Section Saved Failed',
  SectionDeleted = '[Section API] Section Deleted',
  SectionDeletedSuccess = '[Section API] Section Deleted Success',
  SectionDeletedFailed = '[Section API] Section Deleted Failed',
  SectionsRefreshed = '[View Section Page] Sections Refreshed'
}

export class SectionsRefreshed implements Action {
  readonly type = SectionListActions.SectionsRefreshed;

  constructor() {}
}

export class SectionsRequested implements Action {
  readonly type = SectionListActions.SectionsRequested;

  constructor() {}
}

export class SectionsRequestedFailed implements Action {
  readonly type = SectionListActions.SectionsRequestedFailed;

  constructor(public payload: any) {}
}

export class SectionsLoaded implements Action {
  readonly type = SectionListActions.SectionsLoaded;

  constructor(public payload: {sections: SectionModel[]}) {}
}

export class SectionCreated implements Action {
  readonly type = SectionListActions.SectionCreated;

  constructor(public payload: {section: SectionModel}) {}
}

export class SectionCreatedFailed implements Action {
  readonly type = SectionListActions.SectionCreatedFailed;

  constructor(public payload: any) {}
}

export class SectionCreatedSuccess implements Action {
  readonly type = SectionListActions.SectionCreatedSuccess;

  constructor(public payload: {section: SectionModel}) {}
}

export class SectionSaved implements Action {
  readonly type = SectionListActions.SectionSaved;

  constructor(public payload: {section: SectionModel}) {}
}

export class SectionSavedFailed implements Action {
  readonly type = SectionListActions.SectionSavedFailed;

  constructor(public payload: any) {}
}

export class SectionSavedSuccess implements Action {
  readonly type = SectionListActions.SectionSavedSuccess;

  constructor(public payload: {section: Update<SectionModel>}) {}
}

export class SectionDeleted implements Action {
  readonly type = SectionListActions.SectionDeleted;

  constructor(public payload: {id: number}) {}
}

export class SectionDeletedFailed implements Action {
  readonly type = SectionListActions.SectionDeletedFailed;

  constructor(public payload: any) {}
}

export class SectionDeletedSuccess implements Action {
  readonly type = SectionListActions.SectionDeletedSuccess;

  constructor(public payload: {id: number}) {}
}

export type SectionActions =
  | SectionsRequested
  | SectionsRequestedFailed
  | SectionsLoaded
  | SectionCreated 
  | SectionCreatedSuccess 
  | SectionCreatedFailed 
  | SectionSaved 
  | SectionSavedSuccess 
  | SectionSavedFailed 
  | SectionDeleted 
  | SectionDeletedSuccess 
  | SectionDeletedFailed 
  | SectionsRefreshed
