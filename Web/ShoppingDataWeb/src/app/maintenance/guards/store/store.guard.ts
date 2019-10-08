import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as fromStore from '../../store';
import { switchMap, catchError, tap, filter, take } from 'rxjs/operators';
import { StoresRequested } from '../../store';

@Injectable({
  providedIn: 'root'
})
export class StoreGuard implements CanActivate {
  constructor(private store: Store<fromStore.MaintenanceState>) {}
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
      select(fromStore.getStoreEntitiesLoaded),
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(new StoresRequested());
        }
      }),
      filter(loaded => loaded),
      take(1)
    );
  }
}
