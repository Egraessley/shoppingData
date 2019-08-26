import { createSelector } from '@ngrx/store';
import { getMaintenanceState, MaintenanceState } from '../reducers';
import * as fromReducer from '../reducers/type.reducer';

export const getTypeState = createSelector(
  getMaintenanceState,
  (state: MaintenanceState) => state.types
);

export const getTypeEntities  = createSelector(
    getTypeState,
    fromReducer.selectAll
)

export const getTypeEntitiesLoaded = createSelector(
getTypeState,
state=>state.allTypesLoaded
)