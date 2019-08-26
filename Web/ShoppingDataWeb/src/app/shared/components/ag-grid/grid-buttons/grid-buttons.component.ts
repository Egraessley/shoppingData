import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'sd-grid-buttons',
  templateUrl: './grid-buttons.component.html',
  styleUrls: ['./grid-buttons.component.scss'],
})
export class GridButtonsComponent implements ICellRendererAngularComp {
  public params: any;

  constructor() {}

  agInit(params: any): void {
    this.params = params;
  }

  public refresh(): boolean {
    return false;
  }

  public onEdit() {
    this.params.context.componentParent.onEdit(this.params.data.id);
  }

  public onDelete() {
    this.params.context.componentParent.onDelete(this.params.data.id);
  }

  get canDelete() {
    return this.params.data.canDelete;
  }
}
