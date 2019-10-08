import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication/authentication.service';
import { throwError, Observable } from 'rxjs';
import { SpinnyService } from '../spinny/spinny.service';

@Injectable({
  providedIn: 'root',
})
export class AuthInteceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private spinnyService: SpinnyService
  ) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.spinnyService.showSpinny();
    if (
      this.authService.currentUser &&
      this.authService.currentUser.accessToken
    ) {
      const accessToken = this.authService.currentUser.accessToken;
      const clone = req.clone({
        setHeaders: { token: `${accessToken}` },
      });
      return next.handle(clone).pipe(
        tap(
          event => {
            if (event instanceof HttpResponse) {
              this.spinnyService.hideSpinny();
            }
          },
          error => {
            this.spinnyService.hideSpinny();
            if (error.status === 401) {
              localStorage.removeItem('user');
              this.router.navigate(['/login']);
              return throwError(error);
            }
          }
        )
      );
    } else {
      return next.handle(req).pipe(
        tap(
          event => {
            if (event instanceof HttpResponse) {
              this.spinnyService.hideSpinny();
            }
          },
          error => {
            this.spinnyService.hideSpinny();
            if (error.status === 401) {
              localStorage.removeItem('user');
              this.router.navigate(['/login']);
              return throwError(error);
            }
          }
        )
      );
    }
  }
}
