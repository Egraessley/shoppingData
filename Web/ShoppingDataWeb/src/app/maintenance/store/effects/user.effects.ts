import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError, withLatestFrom, filter } from 'rxjs/operators';
import { AccountsService } from '../../../services';
import { Store, select } from '@ngrx/store';
import { of } from 'rxjs/internal/observable/of';
import { AppState } from '../../../store/reducers';
import * as fromActions from '../actions/user.actions';
import { getUserEntitiesLoaded } from '../selectors';
import { UserListModel } from '../../../shared/models';
import { Update } from '@ngrx/entity';

@Injectable()
export class UserEffects {

  @Effect()
  loadUsers$ = this.actions$.pipe(
    ofType<fromActions.UserActions>(
      fromActions.UserListActions.UsersRequested
    ),
    withLatestFrom(this.store.pipe(select(getUserEntitiesLoaded))),
    filter(([action, loaded]) => !loaded),
    switchMap(action =>
      this.service.getUsers().pipe(
        map(users => users.sort((a, b) => (a.lastName < b.lastName ? -1 : 1))),
        map(users => new fromActions.UsersLoaded({ users })),
        catchError(error => of(new fromActions.UsersRequestedFailed(error)))
      )
    )
  );

  @Effect()
  createActivity$ = this.actions$.pipe(
    ofType<fromActions.UserCreated>(
      fromActions.UserListActions.UserCreated
    ),
    map((action: fromActions.UserCreated) => action.payload),
    switchMap(payload => {
      return this.service.addUser(payload.user).pipe(
        map(user => {
          console.log(user);
          if (user.unUsed || user.emailUsed) {
            return new fromActions.UsersUnique({ unUsed: user.unUsed, emailUsed: user.emailUsed });
          }
          return new fromActions.UserCreatedSuccess({ user })
        }),
        catchError(error => of(new fromActions.UserCreatedFailed(error)))
      );
    })
  );

  @Effect()
  updateUser$ = this.actions$.pipe(
    ofType<fromActions.UserSaved>(
      fromActions.UserListActions.UserSaved
    ),
    map((action: fromActions.UserSaved) => action.payload),
    switchMap(payload => {
      let user: Update<UserListModel> = {
        id: payload.user.id,
        changes: payload.user,
      };
      return this.service.updateUser(payload.user).pipe(
        map(
          updatedUser => {
            if (updatedUser.unUsed || updatedUser.emailUsed) {
              return new fromActions.UsersUnique({ unUsed: updatedUser.unUsed, emailUsed: updatedUser.emailUsed });
            }
            user.changes = updatedUser;
            return new fromActions.UserSavedSuccess({ user });
          }
        ),
        catchError(error => of(new fromActions.UserSavedFailed(error)))
      );
    })
  );

  @Effect()
  deleteActivity$ = this.actions$.pipe(
    ofType<fromActions.UserDeleted>(
      fromActions.UserListActions.UserDeleted
    ),
    map((action: fromActions.UserDeleted) => action.payload),
    switchMap(x => {
      return this.service.deleteUser(x.id).pipe(
        map(id => new fromActions.UserDeletedSuccess({ id: x.id })),
        catchError(error => of(new fromActions.UserDeletedFailed(error)))
      );
    })
  );

  constructor(
    private actions$: Actions,
    private service: AccountsService,
    private store: Store<AppState>
  ) { }
}
