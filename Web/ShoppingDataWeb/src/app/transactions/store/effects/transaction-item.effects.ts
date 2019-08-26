import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError, withLatestFrom, filter, tap } from 'rxjs/operators';
import { TransactionService } from '../../../services';
import { Store, select } from '@ngrx/store';
import { of } from 'rxjs/internal/observable/of';
import { AppState } from '../../../store/reducers';
import * as fromActions from '../actions/transaction-item.actions';
import { getCurrentTransactionItem } from '../selectors';
import { TransactionsRefreshed } from '../actions';
import { Router } from '@angular/router';

@Injectable()
export class TransactionItemEffects {
    id = 0;
    @Effect()
    loadtransactions$ = this.actions$.pipe(
      ofType<fromActions.TransactionItemActions>(
        fromActions.TransactionItemListActions.TransactionItemRequested
      ),
      map((action:fromActions.TransactionItemsRequested) => this.id = action.payload.id),
      withLatestFrom(this.store.pipe(select(getCurrentTransactionItem))),
      filter(([action, item]) => !item || item.id !==this.id),
      switchMap(([action,loaded]) =>
        this.service.getById(this.id).pipe(
          map(transaction => new fromActions.TransactionItemsLoaded({ transaction })),
          catchError(error => of(new fromActions.TransactionItemsRequestedFailed(error)))
        )
      )
    );

    @Effect()
    createActivity$ = this.actions$.pipe(
      ofType<fromActions.TransactionItemCreated>(
        fromActions.TransactionItemListActions.TransactionItemCreated
      ),
      map((action: fromActions.TransactionItemCreated) => action.payload),
      switchMap(payload => {
        return this.service.createOne(payload.transaction).pipe(
          tap(x=>this.store.dispatch(new TransactionsRefreshed())),
          map(transaction => {
            let action = new fromActions.TransactionItemCreatedSuccess({transaction});
            this.router.navigateByUrl(`transactions/${transaction.id}`);
            return action;
            
          }),
          catchError(error => of(new fromActions.TransactionItemCreatedFailed(error)))
        );
      })
    );

    @Effect()
    updatetransaction$ = this.actions$.pipe(
      ofType<fromActions.TransactionItemSaved>(
        fromActions.TransactionItemListActions.TransactionItemSaved
      ),
      map((action: fromActions.TransactionItemSaved) => action.payload),
      switchMap(payload => {
        return this.service.updateOne(payload.transaction.id,payload.transaction).pipe(
          tap(x=>this.store.dispatch(new TransactionsRefreshed())),
          map(
            updatedtransaction =>{
                return new fromActions.TransactionItemSavedSuccess({ transaction:updatedtransaction });
            }
          ),
          catchError(error => of(new fromActions.TransactionItemSavedFailed(error)))
        );
      })
    );

  constructor(
    private actions$: Actions,
    private service: TransactionService,
    private store: Store<AppState>,
    private router: Router
  ) {}
}
