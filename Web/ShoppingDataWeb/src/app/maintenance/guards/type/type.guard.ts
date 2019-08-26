import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { switchMap, catchError, tap, filter, take } from 'rxjs/operators';
import { TypesRequested, getTypeEntitiesLoaded , MaintenanceState } from '../../store';

@Injectable({
  providedIn: 'root'
})
export class TypeGuard implements CanActivate {
  constructor(private store: Store<MaintenanceState>) {}
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
      select(getTypeEntitiesLoaded),
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(new TypesRequested());
        }
      }),
      filter(loaded => loaded),
      take(1)
    );
  }
}