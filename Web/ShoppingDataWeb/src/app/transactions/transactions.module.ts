import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionsRoutingModule } from './transactions-routing.module';
import { transactionEffects, reducers } from './store';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AgGridModule } from 'ag-grid-angular';
import { FriendlyDateComponent } from '../shared/components/ag-grid/friendly-date/friendly-date.component';
import { ShortDateComponent } from '../shared/components/ag-grid/short-date/short-date.component';
import { GridButtonsComponent } from '../shared/components/ag-grid/grid-buttons/grid-buttons.component';
import { ActiveColumnComponent } from '../shared/components/ag-grid/active-column/active-column.component';
import { MaintenanceModule } from '../maintenance/maintenance.module';
import { ProductFormComponent } from '../maintenance/product/components/product-form/product-form.component';
import { BrandFormComponent } from '../maintenance/brand/components/brand-form/brand-form.component';
import { TagFormComponent } from '../maintenance/tags/components/tag-form/tag-form.component';
import { SectionFormComponent } from '../maintenance/section/components/section-form/section-form.component';
import { TypeFormComponent } from '../maintenance/type/components/type-form/type-form.component';
import { ModalModule, BsModalRef, BsModalService, BsDatepickerModule, TypeaheadModule } from 'ngx-bootstrap';
import { TransactionItemComponent } from './containers/transaction-item/transaction-item.component';
import { TransactionComponent } from './containers/transaction/transaction.component';
import { TransactionListComponent } from './components/transaction-list/transaction-list.component';
import { TransactionFormComponent } from './components/transaction-form/transaction-form.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { OrderFormComponent } from './components/order-form/order-form.component';
import { NgxErrorsModule } from '../ngxerrors/ngxerrors.module';
import { ProductFilterComponent } from './components/product-filter/product-filter.component';

@NgModule({
  declarations: [TransactionItemComponent, TransactionComponent, TransactionListComponent, TransactionFormComponent, OrderListComponent, OrderFormComponent, ProductFilterComponent],
  imports: [
    CommonModule,
    TransactionsRoutingModule,
    EffectsModule.forFeature(transactionEffects),
    StoreModule.forFeature('transactions', reducers),
    ReactiveFormsModule,
    SharedModule,
    AgGridModule.withComponents([
      FriendlyDateComponent,
      ShortDateComponent,
      GridButtonsComponent,
      ActiveColumnComponent
    ]),
    MaintenanceModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TypeaheadModule.forRoot(),
    NgxErrorsModule
  ],
  providers:[BsModalRef,BsModalService],
  entryComponents: [
    BrandFormComponent,
    TagFormComponent,
    SectionFormComponent,
    TypeFormComponent,
    ProductFormComponent
  ]
})
export class TransactionsModule { }
