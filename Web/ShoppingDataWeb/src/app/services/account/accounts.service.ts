import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, of } from 'rxjs';
import { testHelpers } from '../../testing/testhelpers';
import { StoreModel, UserListModel, UserModel } from '../../shared/models';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  private url = `${environment.apiBaseUrl}account`

  constructor(private http:HttpClient) { 
  }
  
  getUsers():Observable<UserListModel[]>
  {
    return this.http.get<UserListModel[]>(`${this.url}/user`);
  }
  
  getUserById(id: number):Observable<UserListModel>
  {
    return this.http.get<UserListModel>(`${this.url}/user/${id}`);
  }
  
  addUser(model: UserListModel):Observable<any>
  {
    return this.http.post<any>(`${this.url}/user`,model);
  }
  
  updateUser(model: UserListModel):Observable<any>
  {
    return this.http.put<any>(`${this.url}/user/${model.id}`,model);
  }
  
  deleteUser(id: number):Observable<number>
  {
    return this.http.delete<number>(`${this.url}/user/${id}`);
  }
}
