import { createSelector } from '@ngrx/store';
import { getMaintenanceState, MaintenanceState } from '../reducers';
import * as fromReducer from '../reducers/tag.reducer';

export const getTagState = createSelector(
  getMaintenanceState,
  (state: MaintenanceState) => state.tags
);

export const getTagEntities  = createSelector(
    getTagState,
    fromReducer.selectAll
)

export const getTagEntitiesLoaded = createSelector(
getTagState,
state=>state.allTagsLoaded
)