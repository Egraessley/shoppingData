import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'sd-full-name',
  templateUrl: './full-name.component.html',
  styleUrls: ['./full-name.component.scss']
})
export class FullNameComponent implements ICellRendererAngularComp {
  public params: any;
  name = '';
  constructor() {}

  agInit(params: any): void {
    this.params = params;
    this.name = `${params.data.firstName} ${params.data.lastName}`;
  }

  public refresh(): boolean {
    return false;
  }
}

