import { UserListModel } from '../../../shared/models';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as fromUserActions from '../actions/user.actions';

export interface UsersState extends EntityState<UserListModel> {
  allUsersLoaded: boolean;
  unUsed: boolean;
  emailUsed: boolean;
  saveSuccess: boolean;
}

export function sortByName(user1: UserListModel, user2: UserListModel) {
  return user1.lastName.localeCompare(user2.lastName);
}

export const adapter: EntityAdapter<UserListModel> = createEntityAdapter<
  UserListModel
>({
  sortComparer: sortByName,
});

export const initialState: UsersState = adapter.getInitialState({
  allUsersLoaded: false,
  unUsed: false,
  emailUsed: false,
  saveSuccess: false,
});

export function reducer(
  state = initialState,
  action: fromUserActions.UserActions
): UsersState {
  switch (action.type) {
    case fromUserActions.UserListActions.UsersLoaded: {
      return adapter.addAll(action.payload.users, {
        ...state,
        allUsersLoaded: true,
        unUsed: false,
        emailUsed: false
      });
    }
    case fromUserActions.UserListActions.UsersRequestedFailed: {
      return {
        ...state,
        allUsersLoaded: false,
        unUsed: false,
        emailUsed: false
      };
    }
    case fromUserActions.UserListActions.UserSavedSuccess: {
      return adapter.updateOne(action.payload.user, {
        ...state,
        unUsed: false,
        emailUsed: false,
        saveSuccess: true
      });
    }
    case fromUserActions.UserListActions.UserCreatedSuccess: {
      return adapter.addOne(action.payload.user, {
        ...state,
        unUsed: false,
        emailUsed: false,
        saveSuccess: true
      });
    }
    case fromUserActions.UserListActions.UserDeletedSuccess: {
      return adapter.removeOne(action.payload.id, {
        ...state,
        unUsed: false,
        emailUsed: false
      });
    }
    case fromUserActions.UserListActions.UsersRefreshed: {
      return {
        ...state,
        allUsersLoaded: false,
        unUsed: false,
        emailUsed: false
      };
    }
    case fromUserActions.UserListActions.UsersUnique: {
      return {
        ...state,
        unUsed: action.payload.unUsed,
        emailUsed: action.payload.emailUsed
      };
    }
    default: {
      return {...state, saveSuccess: false};
    }
  }
}

export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal,
} = adapter.getSelectors();
