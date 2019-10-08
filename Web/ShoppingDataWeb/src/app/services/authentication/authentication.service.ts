import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import * as fromModels from '../../shared/models';
import { LocalStorageService } from '../local-storage/local-storage.service';
import {
  UserListModel
} from '../../shared/models';

const URL = environment.apiBaseUrl;

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  // tslint:disable-next-line:variable-name
  private _currentUser: fromModels.UserModel;

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) {}

  login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );
    const body = `userName=${username}&password=${password}&grant_type=password`;
    return this.http.post(`${environment.apiBaseUrl}auth/login`, body, {
      headers,
    });
  }
  
  register(model: UserListModel):Observable<any>
  {
    return this.http.post<any>(`${environment.apiBaseUrl}auth/register`,model);
  }

  get currentUser(): fromModels.UserModel {
    if (!this._currentUser) {
      const user: fromModels.UserModel = JSON.parse(
        localStorage.getItem('shoppingUser')
      );
      return user;
    }
    return this._currentUser;
  }
  get isLoggedIn(): boolean {
    if (this.localStorage.containsKey('shoppingUser')) {
      const user = JSON.parse(this.localStorage.get('shoppingUser'));
      if (user.accessToken) {
        return true;
      }
      return false;
    }
    return false;
  }

  clearSession(): void {
    this.localStorage.clear();
  }
}
