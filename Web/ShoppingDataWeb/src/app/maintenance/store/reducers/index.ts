import {
    Action,
    ActionReducerMap,
    createFeatureSelector,
    createSelector,
  } from '@ngrx/store';
import * as fromBrands from './brand.reducer';
import * as fromProducts from './product.reducer';
import * as fromSections from './section.reducer';
import * as fromTags from './tag.reducer';
import * as fromTypes from './type.reducer';
import * as fromStores from './store.reducer';
import * as fromUsers from './user.reducer';


export interface MaintenanceState {
    brands: fromBrands.BrandsState;
    products: fromProducts.ProductsState;
    sections: fromSections.SectionsState;
    tags: fromTags.TagsState;
    types: fromTypes.TypesState;
    stores: fromStores.StoresState;
    users: fromUsers.UsersState;
}

export const reducers: ActionReducerMap<MaintenanceState> = {
    brands: fromBrands.reducer,
    products: fromProducts.reducer,
    sections: fromSections.reducer,
    tags: fromTags.reducer,
    types: fromTypes.reducer,
    stores: fromStores.reducer,
    users: fromUsers.reducer
}

export const initialState: MaintenanceState = {
    brands: fromBrands.initialState,
    products: fromProducts.initialState,
    sections: fromSections.initialState,
    tags: fromTags.initialState,
    types: fromTypes.initialState,
    stores: fromStores.initialState,
    users: fromUsers.initialState,
}

export const getMaintenanceState = createFeatureSelector<MaintenanceState>(
  'maintenance'
);
  
export function maintenanceReducer(
  state = initialState,
  action: Action
): MaintenanceState {
  switch (action.type) {
    default:
      return state;
  }
}