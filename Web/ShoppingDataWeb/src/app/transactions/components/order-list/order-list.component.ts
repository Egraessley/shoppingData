import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormArray, FormGroup, FormControl } from '@angular/forms';
import * as fromModels from '../../../shared/models';

@Component({
  selector: 'sd-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  open = null;
  
  @Input()
  brands: fromModels.BrandModel[] = [];

  @Input()
  products: fromModels.ProductListModel[] = [];

  @Input()
  sections: fromModels.SectionModel[] = [];

  @Input()
  tags: fromModels.TagModel[] = [];

  @Input()
  types: fromModels.TypeModel[] = [];


  @Input()
  parentForm: FormArray

  @Output()
  removeOrder = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  onRemoveOrder(index: number) {
    this.removeOrder.emit(index);
  }

  removeTag(control: FormGroup,id: number) {
    let value = control.value.tags.filter(x=>x.id !== id);
    control.controls.tags.patchValue(value);
  }


  get itemControls():FormGroup[] {
    return (<FormGroup[]>this.parentForm.controls)
  }

  getProductName(itemControl: FormGroup) {
    let product: fromModels.ProductListModel;
    if(itemControl.value.productId)
    {
      product = this.products.find(x=>x.id === +itemControl.value.productId);
    }
    return product ? product.name : 'none'
  }

}
