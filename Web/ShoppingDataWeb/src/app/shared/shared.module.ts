import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal/confirm-modal.component';
import { ConfirmModalService } from './components/confirm-modal/confirm-modal.service';
import { GridButtonsComponent } from './components/ag-grid/grid-buttons/grid-buttons.component';
import { ActiveColumnComponent } from './components/ag-grid/active-column/active-column.component';
import { FriendlyDateComponent } from './components/ag-grid/friendly-date/friendly-date.component';
import { ShortDateComponent } from './components/ag-grid/short-date/short-date.component';

@NgModule({
  declarations: [
    ConfirmModalComponent,
    GridButtonsComponent,
    ActiveColumnComponent,
    FriendlyDateComponent,
    ShortDateComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [ConfirmModalService],
  entryComponents:[
    ConfirmModalComponent
  ]
})
export class SharedModule { }