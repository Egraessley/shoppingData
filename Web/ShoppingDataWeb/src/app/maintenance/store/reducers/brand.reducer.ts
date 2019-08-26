import { BrandModel } from '../../../shared/models';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as fromBrandActions from '../actions/brand.actions';

export interface BrandsState extends EntityState<BrandModel> {
  allBrandsLoaded: boolean;
}

export function sortByName(brand1: BrandModel, brand2: BrandModel) {
  return brand1.name.localeCompare(brand2.name);
}

export const adapter: EntityAdapter<BrandModel> = createEntityAdapter<
  BrandModel
>({
  sortComparer: sortByName,
});

export const initialState: BrandsState = adapter.getInitialState({
  allBrandsLoaded: false,
});

export function reducer(
  state = initialState,
  action: fromBrandActions.BrandActions
): BrandsState {
  switch (action.type) {
    case fromBrandActions.BrandListActions.BrandsLoaded: {
      return adapter.addAll(action.payload.brands, {
        ...state,
        allBrandsLoaded: true,
      });
    }
    case fromBrandActions.BrandListActions.BrandsRequestedFailed: {
      return {
        ...state,
        allBrandsLoaded: false,
      };
    }
    case fromBrandActions.BrandListActions.BrandSavedSuccess: {
      return adapter.updateOne(action.payload.brand, state);
    }
    case fromBrandActions.BrandListActions.BrandCreatedSuccess: {
      return adapter.addOne(action.payload.brand, state);
    }
    case fromBrandActions.BrandListActions.BrandDeletedSuccess: {
      return adapter.removeOne(action.payload.id, state);
    }
    case fromBrandActions.BrandListActions.BrandsRefreshed: {
      return {
        ...state,
        allBrandsLoaded: false,
      };
    }
    default: {
      return state;
    }
  }
}

export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal,
} = adapter.getSelectors();
