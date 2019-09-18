import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, of } from 'rxjs';
import { TypeModel } from '../../shared/models';
import { testHelpers } from '../../testing/testhelpers';

@Injectable({
  providedIn: 'root'
})
export class TypesService {

  private url = `${environment.apiBaseUrl}types`;

  constructor(private http:HttpClient) { }

  getById(id: number): Observable<TypeModel> {
    return this.http.get<TypeModel>(`${this.url}/${id}`);
  }

  getAll(): Observable<TypeModel[]> {
    return this.http.get<TypeModel[]>(`${this.url}`);
  }

  createOne(model: TypeModel): Observable<TypeModel> {
    return this.http.post<TypeModel>(`${this.url}`,model);
  }

  UpdateOne(id: number,model: TypeModel): Observable<TypeModel> {
    return this.http.put<TypeModel>(`${this.url}/${id}`,model);
  }

  deleteOne(id: number): Observable<number> {
    return this.http.delete<number>(`${this.url}/${id}`);
  }

}
