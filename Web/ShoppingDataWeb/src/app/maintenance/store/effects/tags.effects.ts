import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError, withLatestFrom, filter } from 'rxjs/operators';
import { TagsService } from '../../../services';
import { Store, select } from '@ngrx/store';
import { of } from 'rxjs/internal/observable/of';
import { AppState } from '../../../store/reducers';
import * as fromActions from '../actions/tag.actions';
import { getTagEntitiesLoaded } from '../selectors';
import { TagModel } from '../../../shared/models';
import { Update } from '@ngrx/entity';

@Injectable()
export class TagEffects {
    
    @Effect()
    loadTags$ = this.actions$.pipe(
      ofType<fromActions.TagActions>(
        fromActions.TagListActions.TagsRequested
      ),
      withLatestFrom(this.store.pipe(select(getTagEntitiesLoaded))),
      filter(([action, loaded]) => !loaded),
      switchMap(action =>
        this.service.getAll().pipe(
          map(tags => tags.sort((a, b) => (a.name < b.name ? -1 : 1))),
          map(tags => new fromActions.TagsLoaded({ tags })),
          catchError(error => of(new fromActions.TagsRequestedFailed(error)))
        )
      )
    );

    @Effect()
    createActivity$ = this.actions$.pipe(
      ofType<fromActions.TagCreated>(
        fromActions.TagListActions.TagCreated
      ),
      map((action: fromActions.TagCreated) => action.payload),
      switchMap(payload => {
        return this.service.createOne(payload.tag).pipe(
          map(tag => new fromActions.TagCreatedSuccess({tag})),
          catchError(error => of(new fromActions.TagCreatedFailed(error)))
        );
      })
    );

    @Effect()
    updateTag$ = this.actions$.pipe(
      ofType<fromActions.TagSaved>(
        fromActions.TagListActions.TagSaved
      ),
      map((action: fromActions.TagSaved) => action.payload),
      switchMap(payload => {
        let tag: Update<TagModel> = {
          id: payload.tag.id,
          changes: payload.tag,
        };
        return this.service.UpdateOne(payload.tag.id,payload.tag).pipe(
          map(
            updatedTag =>{
                tag.changes = updatedTag;
                return new fromActions.TagSavedSuccess({ tag });
            }
          ),
          catchError(error => of(new fromActions.TagSavedFailed(error)))
        );
      })
    );

    @Effect()
    deleteActivity$ = this.actions$.pipe(
      ofType<fromActions.TagDeleted>(
        fromActions.TagListActions.TagDeleted
      ),
      map((action: fromActions.TagDeleted) => action.payload),
      switchMap(x => {
        return this.service.deleteOne(x.id).pipe(
          map(id => new fromActions.TagDeletedSuccess({ id: x.id })),
          catchError(error => of(new fromActions.TagDeletedFailed(error)))
        );
      })
    );

  constructor(
    private actions$: Actions,
    private service: TagsService,
    private store: Store<AppState>
  ) {}
}
