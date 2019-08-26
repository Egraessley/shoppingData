import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { switchMap, catchError, tap, filter, take, map } from 'rxjs/operators';
import { getCurrentTransactionItem ,TransactionState, TransactionsRequested, TransactionItemsRefreshed, TransactionItemsRequested } from '../../store';

@Injectable({
  providedIn: 'root'
})
export class TransactionItemGuard implements CanActivate {
  constructor(private store: Store<TransactionState>) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    let id = next.params.id;
    return id ?  this.checkStore(id).pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    ) : this.returnDefault().pipe(
      switchMap(()=>of(true)),
      catchError(()=>of(false))
    );
  }

  private returnDefault():Observable<boolean> {
    return this.store.pipe(
      select(getCurrentTransactionItem),
      tap(item => {
        if(!item || item.id !==0)
        {
          this.store.dispatch(new TransactionItemsRefreshed())
        }
      }),
      filter(item=>item && item.id ===0),
      switchMap(()=>of(true))
    )
  }

  private checkStore(id: number): Observable<boolean> {
    id = +id;
    return this.store.pipe(
      select(getCurrentTransactionItem),
      tap(item => {
        if (!item || item.id !==id) {
          this.store.dispatch(new TransactionItemsRequested({id}));
        }
      }),
      filter(item => item && item.id ===id),
      switchMap(x=>of(true))
    );
  }
}
