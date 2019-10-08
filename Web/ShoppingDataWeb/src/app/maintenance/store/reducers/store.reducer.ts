import { StoreModel } from '../../../shared/models';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as fromStoreActions from '../actions/store.actions';

export interface StoresState extends EntityState<StoreModel> {
  allStoresLoaded: boolean;
}

export function sortByName(store1: StoreModel, store2: StoreModel) {
  return store1.name.localeCompare(store2.name);
}

export const adapter: EntityAdapter<StoreModel> = createEntityAdapter<
  StoreModel
>({
  sortComparer: sortByName,
});

export const initialState: StoresState = adapter.getInitialState({
  allStoresLoaded: false,
});

export function reducer(
  state = initialState,
  action: fromStoreActions.StoreActions
): StoresState {
  switch (action.type) {
    case fromStoreActions.StoreListActions.StoresLoaded: {
      return adapter.addAll(action.payload.stores, {
        ...state,
        allStoresLoaded: true,
      });
    }
    case fromStoreActions.StoreListActions.StoresRequestedFailed: {
      return {
        ...state,
        allStoresLoaded: false,
      };
    }
    case fromStoreActions.StoreListActions.StoreSavedSuccess: {
      return adapter.updateOne(action.payload.store, state);
    }
    case fromStoreActions.StoreListActions.StoreCreatedSuccess: {
      return adapter.addOne(action.payload.store, state);
    }
    case fromStoreActions.StoreListActions.StoreDeletedSuccess: {
      return adapter.removeOne(action.payload.id, state);
    }
    case fromStoreActions.StoreListActions.StoresRefreshed: {
      return {
        ...state,
        allStoresLoaded: false,
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
