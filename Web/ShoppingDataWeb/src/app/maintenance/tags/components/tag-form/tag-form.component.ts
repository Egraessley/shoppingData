import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap';
import { TagModel } from '../../../../shared/models';

@Component({
  selector: 'sd-tag-form',
  templateUrl: './tag-form.component.html',
  styleUrls: ['./tag-form.component.scss']
})
export class TagFormComponent implements OnInit {

  tag: TagModel;

  save = new EventEmitter<TagModel>();

  form = this.fb.group({
    name: ['',Validators.required]
  });

  constructor(private fb: FormBuilder, private bsModalRef: BsModalRef) { }

  ngOnInit() {
      this.form.patchValue(this.tag);
  }


  get exists(): boolean {
    return this.tag.id > 0;
  }

  onSave() {
    this.save.emit({
      ...this.tag,
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
