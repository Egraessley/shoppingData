import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ReactiveFormsModule } from '@angular/forms';
import { effects, reducers } from './store';
import { BsModalService, ModalModule } from 'ngx-bootstrap';

import { MaintenanceRoutingModule } from './maintenance-routing.module';
import { BrandComponent } from './brand/containers/brand/brand.component';
import { BrandFormComponent } from './brand/components/brand-form/brand-form.component';
import { BrandListComponent } from './brand/components/brand-list/brand-list.component';
import { SharedModule } from '../shared/shared.module';
import { AgGridModule } from 'ag-grid-angular';
import { GridButtonsComponent } from '../shared/components/ag-grid/grid-buttons/grid-buttons.component';
import { ActiveColumnComponent } from '../shared/components/ag-grid/active-column/active-column.component';
import { ShortDateComponent } from '../shared/components/ag-grid/short-date/short-date.component';
import { FriendlyDateComponent } from '../shared/components/ag-grid/friendly-date/friendly-date.component';
import { SectionComponent } from './section/containers/section/section.component';
import { SectionListComponent } from './section/components/section-list/section-list.component';
import { SectionFormComponent } from './section/components/section-form/section-form.component';
import { TagComponent } from './tags/containers/tag/tag.component';
import { TagListComponent } from './tags/components/tag-list/tag-list.component';
import { TagFormComponent } from './tags/components/tag-form/tag-form.component';
import { TypeComponent } from './type/containers/type/type.component';
import { TypeListComponent } from './type/components/type-list/type-list.component';
import { TypeFormComponent } from './type/components/type-form/type-form.component';
import { ProductComponent } from './product/containers/product/product.component';
import { ProductListComponent } from './product/components/product-list/product-list.component';
import { ProductFormComponent } from './product/components/product-form/product-form.component';

@NgModule({
  declarations: [
    BrandComponent,
    BrandFormComponent,
    BrandListComponent,
    SectionComponent,
    SectionListComponent,
    SectionFormComponent,
    TagComponent,
    TagListComponent,
    TagFormComponent,
    TypeComponent,
    TypeListComponent,
    TypeFormComponent,
    ProductComponent,
    ProductListComponent,
    ProductFormComponent
  ],
  imports: [
    CommonModule,
    MaintenanceRoutingModule,
    ModalModule.forRoot(),
    StoreModule.forFeature('maintenance', reducers),
    EffectsModule.forFeature(effects),
    ReactiveFormsModule,
    SharedModule,
    AgGridModule.withComponents([
      GridButtonsComponent,
      ActiveColumnComponent,
      ShortDateComponent,
      FriendlyDateComponent
    ]),
  ],
  providers: [BsModalService],
  entryComponents: [
    BrandFormComponent,
    TagFormComponent,
    SectionFormComponent,
    TypeFormComponent,
    ProductFormComponent
  ]
})
export class MaintenanceModule { }
