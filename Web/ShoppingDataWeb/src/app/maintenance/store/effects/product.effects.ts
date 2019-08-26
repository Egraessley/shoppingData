import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError, withLatestFrom, filter } from 'rxjs/operators';
import { ProductService } from '../../../services';
import { Store, select } from '@ngrx/store';
import { of } from 'rxjs/internal/observable/of';
import { AppState } from '../../../store/reducers';
import * as fromActions from '../actions/product.actions';
import { getProductEntitiesLoaded } from '../selectors';
import { ProductListModel, ProductCreateModel, ProductUpdateModel } from '../../../shared/models';
import { Update } from '@ngrx/entity';

@Injectable()
export class ProductEffects {
    
    @Effect()
    loadProducts$ = this.actions$.pipe(
      ofType<fromActions.ProductActions>(
        fromActions.ProductListActions.ProductsRequested
      ),
      withLatestFrom(this.store.pipe(select(getProductEntitiesLoaded))),
      filter(([action, loaded]) => !loaded),
      switchMap(action =>
        this.service.getAll().pipe(
          map(products => products.sort((a, b) => (a.name < b.name ? -1 : 1))),
          map(products => new fromActions.ProductsLoaded({ products })),
          catchError(error => of(new fromActions.ProductsRequestedFailed(error)))
        )
      )
    );

    @Effect()
    createActivity$ = this.actions$.pipe(
      ofType<fromActions.ProductCreated>(
        fromActions.ProductListActions.ProductCreated
      ),
      map((action: fromActions.ProductCreated) => action.payload),
      switchMap(payload => {
        return this.service.createOne(payload.product).pipe(
          map(product => new fromActions.ProductCreatedSuccess({product})),
          catchError(error => of(new fromActions.ProductCreatedFailed(error)))
        );
      })
    );

    @Effect()
    updateProduct$ = this.actions$.pipe(
      ofType<fromActions.ProductSaved>(
        fromActions.ProductListActions.ProductSaved
      ),
      map((action: fromActions.ProductSaved) => action.payload),
      switchMap(payload => {
        let product: Update<ProductListModel> = {
          id: payload.product.id,
          changes: payload.product,
        };
        return this.service.UpdateOne(payload.product.id,payload.product).pipe(
          map(
            updatedProduct =>{
                product.changes = updatedProduct;
                return new fromActions.ProductSavedSuccess({ product });
            }
          ),
          catchError(error => of(new fromActions.ProductSavedFailed(error)))
        );
      })
    );

    @Effect()
    deleteActivity$ = this.actions$.pipe(
      ofType<fromActions.ProductDeleted>(
        fromActions.ProductListActions.ProductDeleted
      ),
      map((action: fromActions.ProductDeleted) => action.payload),
      switchMap(x => {
        return this.service.deleteOne(x.id).pipe(
          map(id => new fromActions.ProductDeletedSuccess({ id: x.id })),
          catchError(error => of(new fromActions.ProductDeletedFailed(error)))
        );
      })
    );

  constructor(
    private actions$: Actions,
    private service: ProductService,
    private store: Store<AppState>
  ) {}
}
