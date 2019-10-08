import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError, withLatestFrom, filter } from 'rxjs/operators';
import { StoresService } from '../../../services';
import { Store, select } from '@ngrx/store';
import { of } from 'rxjs/internal/observable/of';
import { AppState } from '../../../store/reducers';
import * as fromActions from '../actions/store.actions';
import { getStoreEntitiesLoaded } from '../selectors';
import { StoreModel } from '../../../shared/models';
import { Update } from '@ngrx/entity';

@Injectable()
export class StoreEffects {
    
    @Effect()
    loadStores$ = this.actions$.pipe(
      ofType<fromActions.StoreActions>(
        fromActions.StoreListActions.StoresRequested
      ),
      withLatestFrom(this.store.pipe(select(getStoreEntitiesLoaded))),
      filter(([action, loaded]) => !loaded),
      switchMap(action =>
        this.service.getAll().pipe(
          map(stores => stores.sort((a, b) => (a.name < b.name ? -1 : 1))),
          map(stores => new fromActions.StoresLoaded({ stores })),
          catchError(error => of(new fromActions.StoresRequestedFailed(error)))
        )
      )
    );

    @Effect()
    createStore$ = this.actions$.pipe(
      ofType<fromActions.StoreCreated>(
        fromActions.StoreListActions.StoreCreated
      ),
      map((action: fromActions.StoreCreated) => action.payload),
      switchMap(payload => {
        return this.service.createOne(payload.store).pipe(
          map(store => new fromActions.StoreCreatedSuccess({store})),
          catchError(error => of(new fromActions.StoreCreatedFailed(error)))
        );
      })
    );

    @Effect()
    updateStore$ = this.actions$.pipe(
      ofType<fromActions.StoreSaved>(
        fromActions.StoreListActions.StoreSaved
      ),
      map((action: fromActions.StoreSaved) => action.payload),
      switchMap(payload => {
        let store: Update<StoreModel> = {
          id: payload.store.id,
          changes: payload.store,
        };
        return this.service.UpdateOne(payload.store.id,payload.store).pipe(
          map(
            updatedStore =>{
                store.changes = updatedStore;
                return new fromActions.StoreSavedSuccess({ store });
            }
          ),
          catchError(error => of(new fromActions.StoreSavedFailed(error)))
        );
      })
    );

    @Effect()
    deleteStore$ = this.actions$.pipe(
      ofType<fromActions.StoreDeleted>(
        fromActions.StoreListActions.StoreDeleted
      ),
      map((action: fromActions.StoreDeleted) => action.payload),
      switchMap(x => {
        return this.service.deleteOne(x.id).pipe(
          map(id => new fromActions.StoreDeletedSuccess({ id: x.id })),
          catchError(error => of(new fromActions.StoreDeletedFailed(error)))
        );
      })
    );

  constructor(
    private actions$: Actions,
    private service: StoresService,
    private store: Store<AppState>
  ) {}
}
