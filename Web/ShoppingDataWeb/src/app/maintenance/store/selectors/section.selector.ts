import { createSelector } from '@ngrx/store';
import { getMaintenanceState, MaintenanceState } from '../reducers';
import * as fromReducer from '../reducers/section.reducer';

export const getSectionState = createSelector(
  getMaintenanceState,
  (state: MaintenanceState) => state.sections
);

export const getSectionEntities  = createSelector(
    getSectionState,
    fromReducer.selectAll
)

export const getSectionEntitiesLoaded = createSelector(
getSectionState,
state=>state.allSectionsLoaded
)