import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TransactionListModel, TransactionModel } from '../../shared/models';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private url = `${environment.apiBaseUrl}transactions`

  constructor(private http: HttpClient) { }

  getAll(): Observable<TransactionListModel[]> {
    return this.http.get<TransactionListModel[]>(`${this.url}`);
  }

  getById(id: number): Observable<TransactionModel> {
    return this.http.get<TransactionModel>(`${this.url}/${id}`);
  }

  createOne(model: TransactionModel): Observable<TransactionModel> {
    return this.http.post<TransactionModel>(`${this.url}`,model);
  }

  updateOne(id: number,model: TransactionModel): Observable<TransactionModel> {
    return this.http.put<TransactionModel>(`${this.url}/${id}`,model);
  }

}
