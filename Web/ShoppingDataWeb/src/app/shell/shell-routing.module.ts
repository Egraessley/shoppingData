import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShellComponent } from './shell.component';

const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: 'home',
        loadChildren: 'app/home/home.module#HomeModule',
      },
      {
        path: 'admin',
        loadChildren: 'app/maintenance/maintenance.module#MaintenanceModule',
      },
      {
        path: 'transactions',
        loadChildren: 'app/transactions/transactions.module#TransactionsModule',
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShellRoutingModule { }
