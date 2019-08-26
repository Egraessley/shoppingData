import { SectionModel } from '../../../shared/models';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as fromSectionActions from '../actions/section.actions';

export interface SectionsState extends EntityState<SectionModel> {
  allSectionsLoaded: boolean;
}

export function sortByName(section1: SectionModel, section2: SectionModel) {
  return section1.name.localeCompare(section2.name);
}

export const adapter: EntityAdapter<SectionModel> = createEntityAdapter<
  SectionModel
>({
  sortComparer: sortByName,
});

export const initialState: SectionsState = adapter.getInitialState({
  allSectionsLoaded: false,
});

export function reducer(
  state = initialState,
  action: fromSectionActions.SectionActions
): SectionsState {
  switch (action.type) {
    case fromSectionActions.SectionListActions.SectionsLoaded: {
      return adapter.addAll(action.payload.sections, {
        ...state,
        allSectionsLoaded: true,
      });
    }
    case fromSectionActions.SectionListActions.SectionsRequestedFailed: {
      return {
        ...state,
        allSectionsLoaded: false,
      };
    }
    case fromSectionActions.SectionListActions.SectionSavedSuccess: {
      return adapter.updateOne(action.payload.section, state);
    }
    case fromSectionActions.SectionListActions.SectionCreatedSuccess: {
      return adapter.addOne(action.payload.section, state);
    }
    case fromSectionActions.SectionListActions.SectionDeletedSuccess: {
      return adapter.removeOne(action.payload.id, state);
    }
    case fromSectionActions.SectionListActions.SectionsRefreshed: {
      return {
        ...state,
        allSectionsLoaded: false,
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
