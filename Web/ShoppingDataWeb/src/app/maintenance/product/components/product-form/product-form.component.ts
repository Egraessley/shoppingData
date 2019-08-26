import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap';
import * as fromModels from '../../../../shared/models';

@Component({
  selector: 'sd-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  product: fromModels.ProductUpdateModel;

  brands: fromModels.BrandModel[] = [];
  sections: fromModels.SectionModel[] = [];
  types: fromModels.TypeModel[] = [];


  save = new EventEmitter<fromModels.ProductUpdateModel>();

  form = this.fb.group({
    name: ['',[Validators.required]],
    brandId: [null,[Validators.required]],
    sectionId: [null,[Validators.required]],
    typeId: [null,[Validators.required]]
  });

  constructor(private fb: FormBuilder, private bsModalRef: BsModalRef) { }

  ngOnInit() {
      this.form.patchValue(this.product);
  }


  get exists(): boolean {
    return this.product ? true : false;
  }

  onSave() {
    this.save.emit({
      ...this.product,
      ...this.form.value
    });
  }

  get title(): string {
    return this.exists ? 'Edit' : 'Add';
  }

  get buttonText(): string {
    return this.exists ? 'Update' : 'Create';
  }

}
