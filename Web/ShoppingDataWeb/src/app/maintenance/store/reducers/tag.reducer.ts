import { TagModel } from '../../../shared/models';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as fromTagActions from '../actions/tag.actions';

export interface TagsState extends EntityState<TagModel> {
  allTagsLoaded: boolean;
}

export function sortByName(tag1: TagModel, tag2: TagModel) {
  return tag1.name.localeCompare(tag2.name);
}

export const adapter: EntityAdapter<TagModel> = createEntityAdapter<
  TagModel
>({
  sortComparer: sortByName,
});

export const initialState: TagsState = adapter.getInitialState({
  allTagsLoaded: false,
});

export function reducer(
  state = initialState,
  action: fromTagActions.TagActions
): TagsState {
  switch (action.type) {
    case fromTagActions.TagListActions.TagsLoaded: {
      return adapter.addAll(action.payload.tags, {
        ...state,
        allTagsLoaded: true,
      });
    }
    case fromTagActions.TagListActions.TagsRequestedFailed: {
      return {
        ...state,
        allTagsLoaded: false,
      };
    }
    case fromTagActions.TagListActions.TagSavedSuccess: {
      return adapter.updateOne(action.payload.tag, state);
    }
    case fromTagActions.TagListActions.TagCreatedSuccess: {
      return adapter.addOne(action.payload.tag, state);
    }
    case fromTagActions.TagListActions.TagDeletedSuccess: {
      return adapter.removeOne(action.payload.id, state);
    }
    case fromTagActions.TagListActions.TagsRefreshed: {
      return {
        ...state,
        allTagsLoaded: false,
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
