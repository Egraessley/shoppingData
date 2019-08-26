import { ProductListModel, ProductUpdateModel } from '../../../shared/models';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as fromProductActions from '../actions/product.actions';

export interface ProductsState extends EntityState<ProductListModel> {
  allProductsLoaded: boolean;
}

export function sortByName(product1: ProductListModel, product2: ProductListModel) {
  return product1.name.localeCompare(product2.name);
}

export const adapter: EntityAdapter<ProductListModel> = createEntityAdapter<
  ProductListModel
>({
  sortComparer: sortByName,
});

export const initialState: ProductsState = adapter.getInitialState({
  allProductsLoaded: false,
});

export function reducer(
  state = initialState,
  action: fromProductActions.ProductActions
): ProductsState {
  switch (action.type) {
    case fromProductActions.ProductListActions.ProductsLoaded: {
      return adapter.addAll(action.payload.products, {
        ...state,
        allProductsLoaded: true,
      });
    }
    case fromProductActions.ProductListActions.ProductsRequestedFailed: {
      return {
        ...state,
        allProductsLoaded: false,
      };
    }
    case fromProductActions.ProductListActions.ProductSavedSuccess: {
      return adapter.updateOne(action.payload.product, state);
    }
    case fromProductActions.ProductListActions.ProductCreatedSuccess: {
      return adapter.addOne(action.payload.product, state);
    }
    case fromProductActions.ProductListActions.ProductDeletedSuccess: {
      return adapter.removeOne(action.payload.id, state);
    }
    case fromProductActions.ProductListActions.ProductsRefreshed: {
      return {
        ...state,
        allProductsLoaded: false,
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
