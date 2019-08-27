import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import * as moment from 'moment';

@Component({
  selector: 'sd-friendly-date',
  templateUrl: './friendly-date.component.html',
  styleUrls: ['./friendly-date.component.scss'],
})
export class FriendlyDateComponent implements ICellRendererAngularComp {
  public date = '';

  constructor() {}

  agInit(params: any): void {
    this.date = moment(params.value).format('MM-DD-YYYY');
  }

  public refresh(): boolean {
    return false;
  }
}
