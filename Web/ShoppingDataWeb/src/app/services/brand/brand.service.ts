import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, of } from 'rxjs';
import { BrandModel } from '../../shared/models';
import { testHelpers } from '../../testing/testhelpers';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  private url = `${environment.apiBaseUrl}brands`

  private entities: BrandModel[] = [];

  constructor(private http:HttpClient) { 
    this.entities = testHelpers.createBrandModels(4);
  }

  getById(id: number): Observable<BrandModel> {
    return this.http.get<BrandModel>(`${this.url}/${id}`);
  }

  getAll(): Observable<BrandModel[]> {
    return this.http.get<BrandModel[]>(`${this.url}`);
  }

  createOne(model: BrandModel): Observable<BrandModel> {
    return this.http.post<BrandModel>(`${this.url}`,model);
  }

  UpdateOne(id: number,model: BrandModel): Observable<BrandModel> {
    return this.http.put<BrandModel>(`${this.url}/${id}`,model);
  }

  deleteOne(id: number): Observable<number> {
    return this.http.delete<number>(`${this.url}/${id}`);
  }

}
