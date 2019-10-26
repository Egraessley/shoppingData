import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserListModel } from '../../../../shared/models';
import { FormGroup, Validators, FormBuilder, ValidatorFn, FormControl, ValidationErrors, AbstractControl, Validator } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap';
import { AppState } from '../../../../store';
import { Store, select } from '@ngrx/store';
import { getUserValidationState } from '../../../store';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'sd-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  errors: any = {}
  @Input()
  user: UserListModel;

  @Input()
  users: UserListModel[] = [];

  @Input()
  password = false;

  @Output()
  save = new EventEmitter<UserListModel>();

  @Input()
  saveFailed = new EventEmitter<any>();

  unInUse = false;
  emailInUse = false;

  userNames: string[] = [];

  form: FormGroup = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['',[Validators.required]],
    userName: ['', []],
    email: ['', [Validators.required]],
    password: ['', []],
    confirmPassword: ['', ],
    isAdmin: [false]
  });
  exists = false;
  correctAnswer: string = null;
  constructor(public bsModalRef: BsModalRef, private fb: FormBuilder, private store: Store<AppState>) {}

  ngOnInit() {
    this.store.pipe(
      select(getUserValidationState),
      tap(x=>{
        this.emailInUse = x.emailUsed;
        this.unInUse = x.unUsed
        this.f.email.updateValueAndValidity();
        this.f.userName.updateValueAndValidity();
      })
    ).subscribe();
    if (this.user && this.user.id) {
      this.exists = true;
    }
    this.f.email.setValidators([Validators.required,this.emailCheck])
    this.form.patchValue(this.user);
    this.form.controls.email.valueChanges.subscribe(x=>{
      this.emailInUse = false;
    });
    if (!this.exists) {
      this.form.controls.userName.setValidators([Validators.required, this.userNameCheck]);
      this.form.controls.userName.valueChanges.subscribe(x=>{
        this.unInUse = false;
      });
      this.f.password.setValidators([Validators.required, this.passwordCheck]);
      this.f.confirmPassword.setValidators([Validators.required, this.confirmPasswordCheck]);
    }
    this.saveFailed.subscribe(x=>{
      this.unInUse = x.unUsed;
      this.emailInUse = x.emailInUse;
    });
  }

  

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  get title(): string {
    return this.exists ? 'Edit' : 'Add';
  }

  userNameCheck: ValidatorFn = (control: FormControl): ValidationErrors | null => { 
    return this.unInUse ? {inUse : true} : null;
  }

  emailCheck: ValidatorFn = (control: FormControl): ValidationErrors | null => { 
    return this.emailInUse ? {inUse : true} : null;
  }

  passwordAlphanumeric: ValidatorFn = (control: FormControl): ValidationErrors | null =>{
    let regex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))");
    return control.value && control.value.length && regex.test(control.value) ? null : {weakPassword: true}
  }

  passwordCheck: ValidatorFn = (control: FormControl): ValidationErrors | null => { 
    return control.value.length >= 8 ? null : {tooShort: true};
  }

  confirmPasswordCheck: ValidatorFn = (control: FormControl): ValidationErrors | null => { 
    return this.f.password.value === this.f.confirmPassword.value ? null : {unMatching : true};
  }

  onSave() {
    let merged = {
      ...this.user,
      ...this.form.value
    }
    this.save.emit(merged);
  }
}
