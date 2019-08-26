import { TypeModel } from '../../../shared/models';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as fromTypeActions from '../actions/type.actions';

export interface TypesState extends EntityState<TypeModel> {
  allTypesLoaded: boolean;
}

export function sortByName(type1: TypeModel, type2: TypeModel) {
  return type1.name.localeCompare(type2.name);
}

export const adapter: EntityAdapter<TypeModel> = createEntityAdapter<
  TypeModel
>({
  sortComparer: sortByName,
});

export const initialState: TypesState = adapter.getInitialState({
  allTypesLoaded: false,
});

export function reducer(
  state = initialState,
  action: fromTypeActions.TypeActions
): TypesState {
  switch (action.type) {
    case fromTypeActions.TypeListActions.TypesLoaded: {
      return adapter.addAll(action.payload.types, {
        ...state,
        allTypesLoaded: true,
      });
    }
    case fromTypeActions.TypeListActions.TypesRequestedFailed: {
      return {
        ...state,
        allTypesLoaded: false,
      };
    }
    case fromTypeActions.TypeListActions.TypeSavedSuccess: {
      return adapter.updateOne(action.payload.type, state);
    }
    case fromTypeActions.TypeListActions.TypeCreatedSuccess: {
      return adapter.addOne(action.payload.type, state);
    }
    case fromTypeActions.TypeListActions.TypeDeletedSuccess: {
      return adapter.removeOne(action.payload.id, state);
    }
    case fromTypeActions.TypeListActions.TypesRefreshed: {
      return {
        ...state,
        allTypesLoaded: false,
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
