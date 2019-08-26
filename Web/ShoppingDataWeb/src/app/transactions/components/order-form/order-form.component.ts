import { Component, OnInit, Input } from '@angular/core';
import * as fromModels from '../../../shared/models';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'sd-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent implements OnInit {

  @Input()
  form: FormGroup;
  
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

  constructor() { }

  ngOnInit() {
  }

  typeAheadPatchValue(event: any, field: string,deleteField = false, deletedField = '') {
    this.f[field].patchValue(event.item.id);
    if(deleteField)
    {
      this.f[deletedField].patchValue(null)
    }
  }

  addTag(event) {
    const tag = event.item;
    let value = this.f.tags.value;
    value.push(tag);
    this.f.tags.patchValue(value);
    this.f.tagName.patchValue('');
  }

  get filteredTags(): fromModels.TagModel[] {
    let selectedTags = this.f.tags.value;
    return this.tags.filter(tag=> selectedTags.findIndex(x=>x.id ===tag.id) === -1);
  }

  get f(): { [key: string]: any } {
    return this.form.controls;
  }

}
