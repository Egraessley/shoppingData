import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError, withLatestFrom, filter } from 'rxjs/operators';
import { SectionService } from '../../../services';
import { Store, select } from '@ngrx/store';
import { of } from 'rxjs/internal/observable/of';
import { AppState } from '../../../store/reducers';
import * as fromActions from '../actions/section.actions';
import { getSectionEntitiesLoaded } from '../selectors';
import { SectionModel } from '../../../shared/models';
import { Update } from '@ngrx/entity';

@Injectable()
export class SectionEffects {
    
    @Effect()
    loadSections$ = this.actions$.pipe(
      ofType<fromActions.SectionActions>(
        fromActions.SectionListActions.SectionsRequested
      ),
      withLatestFrom(this.store.pipe(select(getSectionEntitiesLoaded))),
      filter(([action, loaded]) => !loaded),
      switchMap(action =>
        this.service.getAll().pipe(
          map(sections => sections.sort((a, b) => (a.name < b.name ? -1 : 1))),
          map(sections => new fromActions.SectionsLoaded({ sections })),
          catchError(error => of(new fromActions.SectionsRequestedFailed(error)))
        )
      )
    );

    @Effect()
    createActivity$ = this.actions$.pipe(
      ofType<fromActions.SectionCreated>(
        fromActions.SectionListActions.SectionCreated
      ),
      map((action: fromActions.SectionCreated) => action.payload),
      switchMap(payload => {
        return this.service.createOne(payload.section).pipe(
          map(section => new fromActions.SectionCreatedSuccess({section})),
          catchError(error => of(new fromActions.SectionCreatedFailed(error)))
        );
      })
    );

    @Effect()
    updateSection$ = this.actions$.pipe(
      ofType<fromActions.SectionSaved>(
        fromActions.SectionListActions.SectionSaved
      ),
      map((action: fromActions.SectionSaved) => action.payload),
      switchMap(payload => {
        let section: Update<SectionModel> = {
          id: payload.section.id,
          changes: payload.section,
        };
        return this.service.UpdateOne(payload.section.id,payload.section).pipe(
          map(
            updatedSection =>{
                section.changes = updatedSection;
                return new fromActions.SectionSavedSuccess({ section });
            }
          ),
          catchError(error => of(new fromActions.SectionSavedFailed(error)))
        );
      })
    );

    @Effect()
    deleteActivity$ = this.actions$.pipe(
      ofType<fromActions.SectionDeleted>(
        fromActions.SectionListActions.SectionDeleted
      ),
      map((action: fromActions.SectionDeleted) => action.payload),
      switchMap(x => {
        return this.service.deleteOne(x.id).pipe(
          map(id => new fromActions.SectionDeletedSuccess({ id: x.id })),
          catchError(error => of(new fromActions.SectionDeletedFailed(error)))
        );
      })
    );

  constructor(
    private actions$: Actions,
    private service: SectionService,
    private store: Store<AppState>
  ) {}
}
