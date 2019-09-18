import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'sd-friendly-price',
  templateUrl: './friendly-price.component.html',
  styleUrls: ['./friendly-price.component.scss']
})
export class FriendlyPriceComponent implements ICellRendererAngularComp {
  public price = '';

  constructor() {}

  agInit(params: any): void {
    this.price = Number.parseFloat(params.value).toFixed(2);
  }

  public refresh(): boolean {
    return false;
  }
}
