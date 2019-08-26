import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { TagModel } from '../../../shared/models';

export enum TagListActions {
  TagsRequested = '[View Tag Page] TagsRequested',
  TagsRequestedFailed = '[View Tag Page] TagsRequestedFailed',
  TagsLoaded = '[Tag API] TagsLoaded',
  TagCreated = '[Tag API] Tag Created',
  TagCreatedSuccess = '[Tag API] Tag Created Success',
  TagCreatedFailed = '[Tag API] Tag Created Failed',
  TagSaved = '[Tag API] Tag Saved',
  TagSavedSuccess = '[Tag API] Tag Saved Success',
  TagSavedFailed = '[Tag API] Tag Saved Failed',
  TagDeleted = '[Tag API] Tag Deleted',
  TagDeletedSuccess = '[Tag API] Tag Deleted Success',
  TagDeletedFailed = '[Tag API] Tag Deleted Failed',
  TagsRefreshed = '[View Tag Page] Tags Refreshed'
}

export class TagsRefreshed implements Action {
  readonly type = TagListActions.TagsRefreshed;

  constructor() {}
}

export class TagsRequested implements Action {
  readonly type = TagListActions.TagsRequested;

  constructor() {}
}

export class TagsRequestedFailed implements Action {
  readonly type = TagListActions.TagsRequestedFailed;

  constructor(public payload: any) {}
}

export class TagsLoaded implements Action {
  readonly type = TagListActions.TagsLoaded;

  constructor(public payload: {tags: TagModel[]}) {}
}

export class TagCreated implements Action {
  readonly type = TagListActions.TagCreated;

  constructor(public payload: {tag: TagModel}) {}
}

export class TagCreatedFailed implements Action {
  readonly type = TagListActions.TagCreatedFailed;

  constructor(public payload: any) {}
}

export class TagCreatedSuccess implements Action {
  readonly type = TagListActions.TagCreatedSuccess;

  constructor(public payload: {tag: TagModel}) {}
}

export class TagSaved implements Action {
  readonly type = TagListActions.TagSaved;

  constructor(public payload: {tag: TagModel}) {}
}

export class TagSavedFailed implements Action {
  readonly type = TagListActions.TagSavedFailed;

  constructor(public payload: any) {}
}

export class TagSavedSuccess implements Action {
  readonly type = TagListActions.TagSavedSuccess;

  constructor(public payload: {tag: Update<TagModel>}) {}
}

export class TagDeleted implements Action {
  readonly type = TagListActions.TagDeleted;

  constructor(public payload: {id: number}) {}
}

export class TagDeletedFailed implements Action {
  readonly type = TagListActions.TagDeletedFailed;

  constructor(public payload: any) {}
}

export class TagDeletedSuccess implements Action {
  readonly type = TagListActions.TagDeletedSuccess;

  constructor(public payload: {id: number}) {}
}

export type TagActions =
  | TagsRequested
  | TagsRequestedFailed
  | TagsLoaded
  | TagCreated 
  | TagCreatedSuccess 
  | TagCreatedFailed 
  | TagSaved 
  | TagSavedSuccess 
  | TagSavedFailed 
  | TagDeleted 
  | TagDeletedSuccess 
  | TagDeletedFailed
  | TagsRefreshed
