import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap';
import { BrandModel } from '../../../../shared/models';

@Component({
  selector: 'sd-brand-form',
  templateUrl: './brand-form.component.html',
  styleUrls: ['./brand-form.component.scss']
})
export class BrandFormComponent implements OnInit {

  brand: BrandModel;

  save = new EventEmitter<BrandModel>();

  form = this.fb.group({
    name: ['',Validators.required]
  });

  constructor(private fb: FormBuilder, private bsModalRef: BsModalRef) { }

  ngOnInit() {
      this.form.patchValue(this.brand);
  }


  get exists(): boolean {
    return this.brand ? true : false;
  }

  onSave() {
    this.save.emit({
      ...this.brand,
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
