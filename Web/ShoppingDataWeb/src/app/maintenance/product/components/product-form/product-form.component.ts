import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, ValidatorFn, FormControl, ValidationErrors } from '@angular/forms';
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
  products: fromModels.ProductListModel[] = [];


  save = new EventEmitter<fromModels.ProductUpdateModel>();

  form = this.fb.group({
    name: ['',[Validators.required]],
    brandId: [null,[Validators.required]],
    sectionId: [null,[Validators.required]],
    typeId: [null,[Validators.required]]
  });

  constructor(private fb: FormBuilder, public bsModalRef: BsModalRef) { }

  ngOnInit() {
      this.form.patchValue(this.product);
      this.form.controls.name.setValidators([Validators.required,this.uniqueName]);
  }

  uniqueName: ValidatorFn = (control: FormControl): ValidationErrors | null => {
    let product = this.products.find(x=>x.name.toLowerCase() === control.value.toLowerCase());
    return product && product.id !==this.product.id ? {uniqueName: true} : null;
  }


  get exists(): boolean {
    return this.product.id > 0;
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
