import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { switchMap, catchError, tap, filter, take } from 'rxjs/operators';
import { TagsRequested, getTagEntitiesLoaded , MaintenanceState } from '../../store';

@Injectable({
  providedIn: 'root'
})
export class TagGuard implements CanActivate {
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
      select(getTagEntitiesLoaded),
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(new TagsRequested());
        }
      }),
      filter(loaded => loaded),
      take(1)
    );
  }
}