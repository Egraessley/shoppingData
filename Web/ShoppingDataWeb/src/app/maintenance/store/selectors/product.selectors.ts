import { createSelector } from '@ngrx/store';
import { getMaintenanceState, MaintenanceState } from '../reducers';
import * as fromReducer from '../reducers/product.reducer';

export const getProductState = createSelector(
  getMaintenanceState,
  (state: MaintenanceState) => state.products
);

export const getProductEntities  = createSelector(
    getProductState,
    fromReducer.selectAll
)

export const getProductEntitiesLoaded = createSelector(
getProductState,
state=>state.allProductsLoaded
)