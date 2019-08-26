import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TransactionComponent } from './containers/transaction/transaction.component';
import { TransactionItemComponent } from './containers/transaction-item/transaction-item.component';
import { TransactionListGuard, TransactionItemGuard } from './guards';
import * as fromGuards from '../maintenance/guards';

const routes: Routes = [
  {
    path: 'list',
    component: TransactionComponent,
    canActivate: [
      TransactionListGuard
    ]
  },
  {
    path: 'new',
    component: TransactionItemComponent,
    canActivate: [
      fromGuards.BrandGuard,
      fromGuards.ProductGuard,
      fromGuards.SectionGuard,
      fromGuards.TagGuard,
      fromGuards.TypeGuard,
      TransactionItemGuard
    ]
  },
  {
    path: ':id',
    component: TransactionItemComponent,
    canActivate: [
      fromGuards.BrandGuard,
      fromGuards.ProductGuard,
      fromGuards.SectionGuard,
      fromGuards.TagGuard,
      fromGuards.TypeGuard,
      TransactionItemGuard
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionsRoutingModule { }
