import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError, withLatestFrom, filter } from 'rxjs/operators';
import { BrandService } from '../../../services';
import { Store, select } from '@ngrx/store';
import { of } from 'rxjs/internal/observable/of';
import { AppState } from '../../../store/reducers';
import * as fromActions from '../actions/brand.actions';
import { getBrandEntitiesLoaded } from '../selectors';
import { BrandModel } from '../../../shared/models';
import { Update } from '@ngrx/entity';

@Injectable()
export class BrandEffects {
    
    @Effect()
    loadBrands$ = this.actions$.pipe(
      ofType<fromActions.BrandActions>(
        fromActions.BrandListActions.BrandsRequested
      ),
      withLatestFrom(this.store.pipe(select(getBrandEntitiesLoaded))),
      filter(([action, loaded]) => !loaded),
      switchMap(action =>
        this.service.getAll().pipe(
          map(brands => brands.sort((a, b) => (a.name < b.name ? -1 : 1))),
          map(brands => new fromActions.BrandsLoaded({ brands })),
          catchError(error => of(new fromActions.BrandsRequestedFailed(error)))
        )
      )
    );

    @Effect()
    createActivity$ = this.actions$.pipe(
      ofType<fromActions.BrandCreated>(
        fromActions.BrandListActions.BrandCreated
      ),
      map((action: fromActions.BrandCreated) => action.payload),
      switchMap(payload => {
        return this.service.createOne(payload.brand).pipe(
          map(brand => new fromActions.BrandCreatedSuccess({brand})),
          catchError(error => of(new fromActions.BrandCreatedFailed(error)))
        );
      })
    );

    @Effect()
    updateBrand$ = this.actions$.pipe(
      ofType<fromActions.BrandSaved>(
        fromActions.BrandListActions.BrandSaved
      ),
      map((action: fromActions.BrandSaved) => action.payload),
      switchMap(payload => {
        let brand: Update<BrandModel> = {
          id: payload.brand.id,
          changes: payload.brand,
        };
        return this.service.UpdateOne(payload.brand.id,payload.brand).pipe(
          map(
            updatedBrand =>{
                brand.changes = updatedBrand;
                return new fromActions.BrandSavedSuccess({ brand });
            }
          ),
          catchError(error => of(new fromActions.BrandSavedFailed(error)))
        );
      })
    );

    @Effect()
    deleteActivity$ = this.actions$.pipe(
      ofType<fromActions.BrandDeleted>(
        fromActions.BrandListActions.BrandDeleted
      ),
      map((action: fromActions.BrandDeleted) => action.payload),
      switchMap(x => {
        return this.service.deleteOne(x.id).pipe(
          map(id => new fromActions.BrandDeletedSuccess({ id: x.id })),
          catchError(error => of(new fromActions.BrandDeletedFailed(error)))
        );
      })
    );

  constructor(
    private actions$: Actions,
    private service: BrandService,
    private store: Store<AppState>
  ) {}
}
