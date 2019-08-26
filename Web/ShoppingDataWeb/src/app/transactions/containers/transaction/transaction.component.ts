import { Component, OnInit } from '@angular/core';
import { TransactionListModel } from '../../../shared/models';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../store';
import { Router } from '@angular/router';
import { getTransactionListEntities } from '../../store';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'sd-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {

  transactions$: Observable<TransactionListModel[]>;

  constructor(
    private store: Store<AppState>,
    private router: Router
    ) { }

  ngOnInit() {
    this.transactions$ = this.store.pipe(select(getTransactionListEntities));
  }

  onCreate() {
    this.router.navigateByUrl('transactions/new')
  }

  onEdit(id: number) {
    this.router.navigateByUrl(`transactions/${id}`)
  }

}
