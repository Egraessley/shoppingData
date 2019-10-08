import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap';
import { StoreModel } from '../../../../shared/models';

@Component({
  selector: 'sd-store-form',
  templateUrl: './store-form.component.html',
  styleUrls: ['./store-form.component.scss']
})
export class StoreFormComponent implements OnInit {

  store: StoreModel;

  stores: StoreModel[] = [];

  save = new EventEmitter<StoreModel>();

  form = this.fb.group({
    name: ['',Validators.required]
  });

  constructor(private fb: FormBuilder, public bsModalRef: BsModalRef) { }

  ngOnInit() {
      this.form.patchValue(this.store);
  }


  get exists(): boolean {
    return this.store.id > 0;
  }

  onSave() {
    this.save.emit({
      ...this.store,
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
