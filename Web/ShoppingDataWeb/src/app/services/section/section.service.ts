import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, of } from 'rxjs';
import { SectionModel } from '../../shared/models';
import { testHelpers } from '../../testing/testhelpers';

@Injectable({
  providedIn: 'root'
})
export class SectionService {

  private url = `${environment.apiBaseUrl}sections`

  constructor(private http:HttpClient) {}

  getById(id: number): Observable<SectionModel> {
    return this.http.get<SectionModel>(`${this.url}/${id}`);
  }

  getAll(): Observable<SectionModel[]> {
    return this.http.get<SectionModel[]>(`${this.url}`);
  }

  createOne(model: SectionModel): Observable<SectionModel> {
    return this.http.post<SectionModel>(`${this.url}`,model);
  }

  UpdateOne(id: number,model: SectionModel): Observable<SectionModel> {
    return this.http.put<SectionModel>(`${this.url}/${id}`,model);
  }

  deleteOne(id: number): Observable<number> {
    return this.http.delete<number>(`${this.url}/${id}`);
  }

}
