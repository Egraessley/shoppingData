import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';
import { Observable, of } from 'rxjs';
import { ProductListModel, ProductCreateModel, ProductUpdateModel } from '../../shared/models';
import { testHelpers } from '../../testing/testhelpers';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url = `${environment.apiBaseUrl}products`

  constructor(private http:HttpClient) { }

  getById(id: number): Observable<ProductListModel> {
    return this.http.get<ProductListModel>(`${this.url}/${id}`);
  }

  getAll(): Observable<ProductListModel[]> {
    return this.http.get<ProductListModel[]>(`${this.url}`);
  }

  createOne(model): Observable<ProductListModel> {
    return this.http.post<ProductListModel>(`${this.url}`,model);
  }

  UpdateOne(id: number,model): Observable<ProductListModel> {
    return this.http.put<ProductListModel>(`${this.url}/${id}`,model);
  }

  deleteOne(id: number): Observable<number> {
    return this.http.delete<number>(`${this.url}/${id}`);
  }

}
