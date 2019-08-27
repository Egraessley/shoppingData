import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'sd-active-column',
  templateUrl: './active-column.component.html',
  styleUrls: ['./active-column.component.scss'],
})
export class ActiveColumnComponent implements ICellRendererAngularComp {
  public params: any;
  constructor() {}

  agInit(params: any): void {
    this.params = params;
  }

  public refresh(): boolean {
    return false;
  }
}
