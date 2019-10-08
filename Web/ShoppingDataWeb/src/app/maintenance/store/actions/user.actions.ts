import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { UserListModel } from '../../../shared/models';

export enum UserListActions {
  UsersRequested = '[View User Page] UsersRequested',
  UsersRequestedFailed = '[View User Page] UsersRequestedFailed',
  UsersLoaded = '[User API] UsersLoaded',
  UserCreated = '[User API] User Created',
  UserCreatedSuccess = '[User API] User Created Success',
  UserCreatedFailed = '[User API] User Created Failed',
  UserSaved = '[User API] User Saved',
  UserSavedSuccess = '[User API] User Saved Success',
  UserSavedFailed = '[User API] User Saved Failed',
  UserDeleted = '[User API] User Deleted',
  UserDeletedSuccess = '[User API] User Deleted Success',
  UserDeletedFailed = '[User API] User Deleted Failed',
  UsersRefreshed = '[View User Page] Users Refreshed',
  UsersUnique = '[View User Page] Users Not Unique',
  SaveRefreshed = '[View User Page] save refreshed'
}

export class UsersUnique implements Action {
  readonly type = UserListActions.UsersUnique;

  constructor(public payload: any) {}
}

export class UsersRefreshed implements Action {
  readonly type = UserListActions.UsersRefreshed;

  constructor() {}
}

export class SaveRefreshed implements Action {
  readonly type = UserListActions.SaveRefreshed;

  constructor() {}
}

export class UsersRequested implements Action {
  readonly type = UserListActions.UsersRequested;

  constructor() {}
}

export class UsersRequestedFailed implements Action {
  readonly type = UserListActions.UsersRequestedFailed;

  constructor(public payload: any) {}
}

export class UsersLoaded implements Action {
  readonly type = UserListActions.UsersLoaded;

  constructor(public payload: {users: UserListModel[]}) {}
}

export class UserCreated implements Action {
  readonly type = UserListActions.UserCreated;

  constructor(public payload: {user: UserListModel}) {}
}

export class UserCreatedFailed implements Action {
  readonly type = UserListActions.UserCreatedFailed;

  constructor(public payload: any) {}
}

export class UserCreatedSuccess implements Action {
  readonly type = UserListActions.UserCreatedSuccess;

  constructor(public payload: {user: UserListModel}) {}
}

export class UserSaved implements Action {
  readonly type = UserListActions.UserSaved;

  constructor(public payload: {user: UserListModel}) {}
}

export class UserSavedFailed implements Action {
  readonly type = UserListActions.UserSavedFailed;

  constructor(public payload: any) {}
}

export class UserSavedSuccess implements Action {
  readonly type = UserListActions.UserSavedSuccess;

  constructor(public payload: {user: Update<UserListModel>}) {}
}

export class UserDeleted implements Action {
  readonly type = UserListActions.UserDeleted;

  constructor(public payload: {id: number}) {}
}

export class UserDeletedFailed implements Action {
  readonly type = UserListActions.UserDeletedFailed;

  constructor(public payload: any) {}
}

export class UserDeletedSuccess implements Action {
  readonly type = UserListActions.UserDeletedSuccess;

  constructor(public payload: {id: number}) {}
}

export type UserActions =
  | UsersRequested
  | UsersRequestedFailed
  | UsersLoaded
  | UserCreated 
  | UserCreatedSuccess 
  | UserCreatedFailed 
  | UserSaved 
  | UserSavedSuccess 
  | UserSavedFailed 
  | UserDeleted 
  | UserDeletedSuccess 
  | UserDeletedFailed
  | UsersRefreshed
  | UsersUnique
  | SaveRefreshed
