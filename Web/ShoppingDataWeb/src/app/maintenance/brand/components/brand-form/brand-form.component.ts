import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, ValidatorFn, FormControl, ValidationErrors } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap';
import { BrandModel } from '../../../../shared/models';

@Component({
  selector: 'sd-brand-form',
  templateUrl: './brand-form.component.html',
  styleUrls: ['./brand-form.component.scss']
})
export class BrandFormComponent implements OnInit {

  brand: BrandModel;

  brands: BrandModel[];

  save = new EventEmitter<BrandModel>();

  form = this.fb.group({
    name: ['',Validators.required]
  });

  constructor(private fb: FormBuilder, public bsModalRef: BsModalRef) { }

  ngOnInit() {
      this.form.patchValue(this.brand);
      this.form.controls.name.setValidators([Validators.required,this.uniqueName]);
  }


  get exists(): boolean {
    return this.brand.id > 0;
  }

  onSave() {
    this.save.emit({
      ...this.brand,
      ...this.form.value
    });
  }

  uniqueName: ValidatorFn = (control: FormControl): ValidationErrors | null => {
    let brand = this.brands.find(x=>x.name.toLowerCase() === control.value.toLowerCase());
    return brand && brand.id !==this.brand.id ? {uniqueName: true} : null;
  }


  get title(): string {
    return this.exists ? 'Edit' : 'Add';
  }

  get buttonText(): string {
    return this.exists ? 'Update' : 'Create';
  }

}
