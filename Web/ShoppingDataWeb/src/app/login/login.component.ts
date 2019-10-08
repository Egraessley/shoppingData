import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService, LocalStorageService } from '../services';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import { Store } from '@ngrx/store';
import { AppState } from '../store';
import { BrandsRefreshed, ProductsRefreshed, TypesRefreshed, TagsRefreshed } from '../maintenance/store';
import { TransactionsRefreshed } from '../transactions/store';

@Component({
  selector: 'icom-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  showErrorMessage = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    private localStorage: LocalStorageService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.authService.clearSession();
    this.store.dispatch(new BrandsRefreshed());
    this.store.dispatch(new ProductsRefreshed());
    this.store.dispatch(new TransactionsRefreshed());
    this.store.dispatch(new TypesRefreshed());
    this.store.dispatch(new TagsRefreshed());

  }

  register() {
    this.router.navigateByUrl('/login/register')
  }

  authenticateUser() {
    this.authService
      .login(this.form.get('username').value, this.form.get('password').value)
      .subscribe(
        result => {
          let decoded = jwt_decode(result.access_token);
          const user = {
            id: decoded.id,
            userName: decoded.userName,
            accessToken: result.access_token,
            account: decoded.account,
            isAdmin: decoded.isAdmin,
            isSuper: decoded.isSuper
          };
          this.localStorage.add('shoppingUser', JSON.stringify(user));
          this.router.navigateByUrl('/home');
        },
        error => {
          console.log(error);
          this.showErrorMessage = true;
        }
      );
  }
}
