import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { switchMap, catchError, tap, filter, take } from 'rxjs/operators';
import { getTransactionListEntitiesLoaded, TransactionState, TransactionsRequested } from '../../store';


@Injectable({
  providedIn: 'root'
})
export class TransactionListGuard implements CanActivate {
  constructor(private store: Store<TransactionState>) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.checkStore().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  private checkStore(): Observable<boolean> {
    return this.store.pipe(
      select(getTransactionListEntitiesLoaded),
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(new TransactionsRequested());
        }
      }),
      filter(loaded => loaded),
      take(1)
    );
  }
}
