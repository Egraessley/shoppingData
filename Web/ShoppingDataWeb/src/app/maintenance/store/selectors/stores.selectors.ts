import { createSelector } from '@ngrx/store';
import { getMaintenanceState, MaintenanceState } from '../reducers';
import * as fromReducer from '../reducers/store.reducer';

export const getStoreState = createSelector(
  getMaintenanceState,
  (state: MaintenanceState) => state.stores
);

export const getStoreEntities  = createSelector(
    getStoreState,
    fromReducer.selectAll
)

export const getStoreEntitiesLoaded = createSelector(
getStoreState,
state=>state.allStoresLoaded
)