import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrandComponent } from './brand/containers/brand/brand.component';
import * as fromGuards from './guards'
import { TagComponent } from './tags/containers/tag/tag.component';
import { TypeComponent } from './type/containers/type/type.component';
import { SectionComponent } from './section/containers/section/section.component';
import { ProductComponent } from './product/containers/product/product.component';
import { StoreComponent } from './stores/containers/store/store.component';
import { AccountComponent } from './account/containers/account/account.component';

const routes: Routes = [
  {
    path: 'brands',
    component: BrandComponent,
    canActivate: [fromGuards.BrandGuard]
  },
  {
    path: 'products',
    component: ProductComponent,
    canActivate: [
      fromGuards.BrandGuard,
      fromGuards.ProductGuard,
      fromGuards.SectionGuard,
      fromGuards.TagGuard,
      fromGuards.TypeGuard
    ]
  },
  {
    path: 'tags',
    component: TagComponent,
    canActivate: [fromGuards.TagGuard]
  },
  {
    path: 'types',
    component: TypeComponent,
    canActivate: [fromGuards.TypeGuard]
  },
  {
    path: 'sections',
    component: SectionComponent,
    canActivate: [fromGuards.SectionGuard]
  },
  {
    path: 'stores',
    component: StoreComponent,
    canActivate: [fromGuards.StoreGuard]
  },
  {
    path: 'account',
    component: AccountComponent,
    canActivate: [fromGuards.UserGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaintenanceRoutingModule { }
