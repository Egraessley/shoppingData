import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpResponse,
  } from '@angular/common/http';
  import { Observable } from 'rxjs';
  import { Injectable } from '@angular/core';
  import { tap, first, flatMap } from 'rxjs/operators';
  import { SpinnyService } from '../spinny/spinny.service';
  import { Store } from '@ngrx/store';
  import { AppState } from '../store';
  //import { getAccessToken } from '../authentication/store/selectors/login.selectors';
  
  @Injectable({
    providedIn: 'root',
  })
  export class AuthInteceptor implements HttpInterceptor {
    constructor(
      private spinnyService: SpinnyService,
      private store: Store<AppState>
    ) {}
    intercept(
      req: HttpRequest<any>,
      next: HttpHandler
    ): Observable<HttpEvent<any>> {
      /*if (this.router.url !== '/authentication/login') {
        this.store.dispatch(new SetReturnUrl({ url: this.router.url }));
      }*/
      return this.store.pipe(
        //select(getAccessToken),
        first(),
        flatMap(token => {
          this.spinnyService.showSpinny();
          /*const clone = !!token
            ? req.clone({
                setHeaders: { Authorization: `Bearer ${token}` },
              })
            : req;*/
          return next.handle(req).pipe(
            tap(
              event => {
                if (event instanceof HttpResponse) {
                  this.spinnyService.hideSpinny();
                }
              },
              error => {
                this.spinnyService.hideSpinny();
              }
            )
          );
        })
      );
    }
  }
  