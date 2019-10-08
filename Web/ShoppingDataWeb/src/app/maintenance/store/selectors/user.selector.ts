import { createSelector } from '@ngrx/store';
import { getMaintenanceState, MaintenanceState } from '../reducers';
import * as fromReducer from '../reducers/user.reducer';

export const getUserState = createSelector(
  getMaintenanceState,
  (state: MaintenanceState) => state.users
);

export const getUserEntities  = createSelector(
    getUserState,
    fromReducer.selectAll
)

export const getUserEntitiesLoaded = createSelector(
getUserState,
state=>state.allUsersLoaded
)

export const getUserValidationState = createSelector(
getUserState,
state=>{return {emailUsed: state.emailUsed, unUsed: state.unUsed}}
)

export const getUserSavedSuccess = createSelector(
getUserState,
state=>state.saveSuccess
)