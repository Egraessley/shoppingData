import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap';
import { SectionModel } from '../../../../shared/models';

@Component({
  selector: 'sd-section-form',
  templateUrl: './section-form.component.html',
  styleUrls: ['./section-form.component.scss']
})
export class SectionFormComponent implements OnInit {

  section: SectionModel;

  sections: SectionModel[] = [];

  save = new EventEmitter<SectionModel>();

  form = this.fb.group({
    name: ['',Validators.required]
  });

  constructor(private fb: FormBuilder, public bsModalRef: BsModalRef) { }

  ngOnInit() {
      this.form.patchValue(this.section);
  }


  get exists(): boolean {
    return this.section.id > 0;
  }

  onSave() {
    this.save.emit({
      ...this.section,
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
