import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError, withLatestFrom, filter } from 'rxjs/operators';
import { TransactionService } from '../../../services';
import { Store, select } from '@ngrx/store';
import { of } from 'rxjs/internal/observable/of';
import { AppState } from '../../../store/reducers';
import * as fromActions from '../actions/transaction-list.actions';
import { getTransactionListEntitiesLoaded } from '../selectors';
import { TransactionListModel } from '../../../shared/models';
import { Update } from '@ngrx/entity';
import * as moment from 'moment'

@Injectable()
export class TransactionListEffects {
    
    @Effect()
    loadtransactions$ = this.actions$.pipe(
      ofType<fromActions.TransactionActions>(
        fromActions.TransactionListActions.TransactionsRequested
      ),
      withLatestFrom(this.store.pipe(select(getTransactionListEntitiesLoaded))),
      filter(([action, loaded]) => !loaded),
      switchMap(action =>
        this.service.getAll().pipe(
          map(transactions => transactions.sort((a, b) => (moment(a.date).isBefore(moment(b.date)) ? -1 : 1))),
          map(transactions => new fromActions.TransactionsLoaded({ transactions })),
          catchError(error => of(new fromActions.TransactionsRequestedFailed(error)))
        )
      )
    );

  constructor(
    private actions$: Actions,
    private service: TransactionService,
    private store: Store<AppState>
  ) {}
}
