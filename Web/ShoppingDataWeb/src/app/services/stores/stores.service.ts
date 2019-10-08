import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, of } from 'rxjs';
import { testHelpers } from '../../testing/testhelpers';
import { StoreModel } from '../../shared/models';

@Injectable({
  providedIn: 'root'
})
export class StoresService {

  private url = `${environment.apiBaseUrl}store`

  constructor(private http:HttpClient) { 
  }

  getById(id: number): Observable<StoreModel> {
    return this.http.get<StoreModel>(`${this.url}/${id}`);
  }

  getAll(): Observable<StoreModel[]> {
    return this.http.get<StoreModel[]>(`${this.url}`);
  }

  createOne(model: StoreModel): Observable<StoreModel> {
    return this.http.post<StoreModel>(`${this.url}`,model);
  }

  UpdateOne(id: number,model: StoreModel): Observable<StoreModel> {
    return this.http.put<StoreModel>(`${this.url}/${id}`,model);
  }

  deleteOne(id: number): Observable<number> {
    return this.http.delete<number>(`${this.url}/${id}`);
  }
}