import { Component } from '@angular/core';
import * as moment from 'moment';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'lps-short-date',
  templateUrl: './short-date.component.html',
  styleUrls: ['./short-date.component.scss'],
})
export class ShortDateComponent implements ICellRendererAngularComp {
  public date = '';

  constructor() {}

  agInit(params: any): void {
    this.date = moment(params.value).format('M/D/YYYY');
  }

  public refresh(): boolean {
    return false;
  }
}
