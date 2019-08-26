import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError, withLatestFrom, filter } from 'rxjs/operators';
import { TypesService } from '../../../services';
import { Store, select } from '@ngrx/store';
import { of } from 'rxjs/internal/observable/of';
import { AppState } from '../../../store/reducers';
import * as fromActions from '../actions/type.actions';
import { getTypeEntitiesLoaded } from '../selectors';
import { TypeModel } from '../../../shared/models';
import { Update } from '@ngrx/entity';

@Injectable()
export class TypeEffects {
    
    @Effect()
    loadTypes$ = this.actions$.pipe(
      ofType<fromActions.TypeActions>(
        fromActions.TypeListActions.TypesRequested
      ),
      withLatestFrom(this.store.pipe(select(getTypeEntitiesLoaded))),
      filter(([action, loaded]) => !loaded),
      switchMap(action =>
        this.service.getAll().pipe(
          map(types => types.sort((a, b) => (a.name < b.name ? -1 : 1))),
          map(types => new fromActions.TypesLoaded({ types })),
          catchError(error => of(new fromActions.TypesRequestedFailed(error)))
        )
      )
    );

    @Effect()
    createActivity$ = this.actions$.pipe(
      ofType<fromActions.TypeCreated>(
        fromActions.TypeListActions.TypeCreated
      ),
      map((action: fromActions.TypeCreated) => action.payload),
      switchMap(payload => {
        return this.service.createOne(payload.type).pipe(
          map(type => new fromActions.TypeCreatedSuccess({type})),
          catchError(error => of(new fromActions.TypeCreatedFailed(error)))
        );
      })
    );

    @Effect()
    updateType$ = this.actions$.pipe(
      ofType<fromActions.TypeSaved>(
        fromActions.TypeListActions.TypeSaved
      ),
      map((action: fromActions.TypeSaved) => action.payload),
      switchMap(payload => {
        let type: Update<TypeModel> = {
          id: payload.type.id,
          changes: payload.type,
        };
        return this.service.UpdateOne(payload.type.id,payload.type).pipe(
          map(
            updatedType =>{
                type.changes = updatedType;
                return new fromActions.TypeSavedSuccess({ type });
            }
          ),
          catchError(error => of(new fromActions.TypeSavedFailed(error)))
        );
      })
    );

    @Effect()
    deleteActivity$ = this.actions$.pipe(
      ofType<fromActions.TypeDeleted>(
        fromActions.TypeListActions.TypeDeleted
      ),
      map((action: fromActions.TypeDeleted) => action.payload),
      switchMap(x => {
        return this.service.deleteOne(x.id).pipe(
          map(id => new fromActions.TypeDeletedSuccess({ id: x.id })),
          catchError(error => of(new fromActions.TypeDeletedFailed(error)))
        );
      })
    );

  constructor(
    private actions$: Actions,
    private service: TypesService,
    private store: Store<AppState>
  ) {}
}
