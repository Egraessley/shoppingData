import { createSelector } from '@ngrx/store';
import { getMaintenanceState, MaintenanceState } from '../reducers';
import * as fromReducer from '../reducers/brand.reducer';

export const getBrandState = createSelector(
  getMaintenanceState,
  (state: MaintenanceState) => state.brands
);

export const getBrandEntities  = createSelector(
    getBrandState,
    fromReducer.selectAll
)

export const getBrandEntitiesLoaded = createSelector(
getBrandState,
state=>state.allBrandsLoaded
)