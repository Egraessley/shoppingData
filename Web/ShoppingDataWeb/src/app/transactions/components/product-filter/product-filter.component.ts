import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as fromModels from '../../../shared/models';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'sd-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss']
})
export class ProductFilterComponent implements OnInit {

  @Input()
  form: FormGroup;
  
  @Input()
  brands: fromModels.BrandModel[] = [];

  @Input()
  sections: fromModels.SectionModel[] = [];

  @Input()
  types: fromModels.TypeModel[] = [];

  @Output()
  addThing = new EventEmitter<string>();

  @Output()
  clearFilter = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onAddThing(type: string) {
    this.addThing.emit(type);
  }

}
