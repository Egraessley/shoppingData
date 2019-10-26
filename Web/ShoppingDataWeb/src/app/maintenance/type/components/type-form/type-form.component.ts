import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, ValidatorFn, FormControl, ValidationErrors } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap';
import { TypeModel } from '../../../../shared/models';

@Component({
  selector: 'sd-type-form',
  templateUrl: './type-form.component.html',
  styleUrls: ['./type-form.component.scss']
})
export class TypeFormComponent implements OnInit {

  type: TypeModel;

  types: TypeModel[] = [];

  save = new EventEmitter<TypeModel>();

  form = this.fb.group({
    name: ['',Validators.required]
  });

  constructor(private fb: FormBuilder, public bsModalRef: BsModalRef) { }

  ngOnInit() {
      this.form.patchValue(this.type);
      this.form.controls.name.setValidators([Validators.required,this.uniqueName]);
  }

  uniqueName: ValidatorFn = (control: FormControl): ValidationErrors | null => { 
    return this.types.find(x=>x.name.toLowerCase() === control.value.toLowerCase()) ? {uniqueName: true} : null;
  }


  get exists(): boolean {
    return this.type.id > 0;
  }

  onSave() {
    this.save.emit({
      ...this.type,
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
