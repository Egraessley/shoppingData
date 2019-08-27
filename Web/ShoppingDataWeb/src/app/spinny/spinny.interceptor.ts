import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpResponse,
  } from '@angular/common/http';
  import { Observable, throwError } from 'rxjs';
  import { Injectable } from '@angular/core';
  import { tap, first, flatMap } from 'rxjs/operators';
  import { Router } from '@angular/router';
  import { SpinnyService } from '../spinny/spinny.service';
  import { Store, select } from '@ngrx/store';
  import { AppState, SetReturnUrl } from '../store';
  
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
      return this.store.pipe(
        flatMap(token => {
          this.spinnyService.showSpinny();
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
  