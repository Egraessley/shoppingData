import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import * as fromModels from '../../../shared/models';
import { FormBuilder, FormGroup, Validators, FormArray, ValidatorFn, FormControl, ValidationErrors } from '@angular/forms';
import * as moment from 'moment';
import { ConfirmModalService } from '../../../shared/components/confirm-modal/confirm-modal.service';
import { ConfirmResult } from '../../../shared/components/confirm-modal/confirm-modal/confirm-modal.component';
import { TransactionModel, orderItemModel } from '../../../shared/models';

@Component({
  selector: 'sd-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss']
})
export class TransactionFormComponent implements OnInit, OnChanges {

  @Input()
  transaction: fromModels.TransactionModel;

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

  @Output()
  save = new EventEmitter<fromModels.TransactionModel>();
  @Output()
  create = new EventEmitter<fromModels.TransactionModel>();
  @Output()
  cancel = new EventEmitter<any>();
  @Output()
  add = new EventEmitter<string>();

  form: FormGroup = this.fb.group({
    date: [null, [Validators.required]],
    items: this.fb.array([])
  });



  constructor(private fb: FormBuilder, private confirmModalService: ConfirmModalService) { }

  ngOnInit() {
    if (this.transaction) {
      this.setupForm();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.transaction && changes.transaction.currentValue) {
      this.setupForm();
    }
  }

  itemsCheck: ValidatorFn = (group: FormGroup): ValidationErrors | null => {

    return group.controls.items && group.value.items.length ? null : {emptyItems: true}

  }

  priceCheck: ValidatorFn = (control: FormControl): ValidationErrors | null => {

    return !isNaN(+control.value) && +control.value >= 0 ? null : { invalid: true }

  }

  quantityCheck: ValidatorFn = (control: FormControl): ValidationErrors | null => {
    return !isNaN(+control.value) && +control.value > 0 ? null : { invalid: true };
  }

  setupForm() {
    this.form.controls.date.patchValue(moment(this.transaction.date).toDate());
    while ((<FormArray>this.form.controls.items).controls.length) {
      (<FormArray>this.form.controls.items).removeAt(0);
    }

    this.transaction.items.forEach(item => {
      let group = this.fb.group({
        entity: [item],
        quantity: [item.quantity, [this.quantityCheck]],
        price: [item.price, [this.priceCheck]],
        productId: [item.productId, [Validators.required]],
        tags: [item.tags],
        productName: [''],
        tagName: ['']
      });
      (<FormArray>this.form.controls.items).push(group);
    });
    this.form.setValidators([this.itemsCheck])
  }

  onAddThing(type: string) {
    this.add.emit(type);
  }

  onSave() {
    this.save.emit(this.modelFromForm);
  }

  onCreate() {
    this.create.emit(this.modelFromForm);
  }

  onCancel() {
    this.save.emit(this.modelFromForm);
  }


  get modelFromForm(): TransactionModel {
    let value = this.form.getRawValue();
    let items = value.items.map(ctrl => {
      let merged = {
        ...ctrl.entity,
        ...ctrl
      }
      merged.price = Number.parseFloat(merged.price).toFixed(2);
      merged.quantity = Number.parseFloat(merged.quantity).toFixed(2);
      delete merged.entity;
      delete merged.productName;
      delete merged.tagName;
      return merged
    });

    return {
      ...this.transaction,
      ...value,
      ...{ items }
    }
  }

  addOrder() {
    const item: orderItemModel = {
      id: 0,
      price: 0.00,
      productId: null,
      transactionId: this.transaction.id,
      quantity: 0,
      tags: []
    }
    let group = this.fb.group({
      entity: [item],
      quantity: [item.quantity, [this.quantityCheck]],
      price: [item.price, [this.priceCheck]],
      productId: [item.productId, [Validators.required]],
      tags: [item.tags],
      productName: [''],
      tagName: ['']
    });
    (<FormArray>this.form.controls.items).push(group);
  }

  onRemoveOrder(index: number) {
    this.confirmModalService.show('Are you sure you want to remove this item? ', false).subscribe(result => {
      if (result === ConfirmResult.Yes) {
        (<FormArray>this.form.controls.items).removeAt(index);
      }
    })
  }

}
