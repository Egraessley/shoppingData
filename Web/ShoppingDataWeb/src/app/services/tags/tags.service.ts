import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, of } from 'rxjs';
import { TagModel } from '../../shared/models';
import { testHelpers } from '../../testing/testhelpers';

@Injectable({
  providedIn: 'root'
})
export class TagsService {

  private url = `${environment.apiBaseUrl}tags`;

  constructor(private http:HttpClient) { }

  getById(id: number): Observable<TagModel> {
    return this.http.get<TagModel>(`${this.url}/${id}`);
  }

  getAll(): Observable<TagModel[]> {
    return this.http.get<TagModel[]>(`${this.url}`);
  }

  createOne(model: TagModel): Observable<TagModel> {
    return this.http.post<TagModel>(`${this.url}`,model);
  }

  UpdateOne(id: number,model: TagModel): Observable<TagModel> {
    return this.http.put<TagModel>(`${this.url}/${id}`,model);
  }

  deleteOne(id: number): Observable<number> {
    return this.http.delete<number>(`${this.url}/${id}`);
  }

}
