import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { AuthenticationService, LocalStorageService } from '../../services';
import * as jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

@Component({
  selector: 'sd-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  errors = {};

  unInUse = false;
  emailInUse = false;

  userNames: string[] = [];

  form: FormGroup = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    userName: ['', []],
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
    confirmPassword: ['', Validators.required],
  });
  exists = false;
  correctAnswer: string = null;
  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    private localStorage: LocalStorageService
  ) { }

  ngOnInit() {

    this.form.controls.email.valueChanges.subscribe(x => {
      this.emailInUse = false;
    });

    this.form.controls.userName.valueChanges.subscribe(x => {
      this.emailInUse = false;
    });
  }



  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  get title(): string {
    return this.exists ? 'Edit' : 'Add';
  }

  onSave() {
    this.authService.register(this.form.value).subscribe(x => {
      if (x.unUsed || x.emailInUse) {
        this.unInUse = x.unUsed;
        this.emailInUse = x.emailInUse;
      } else {
        let decoded = jwt_decode(x.access_token);
        const user = {
          id: decoded.id,
          userName: decoded.userName,
          accessToken: x.access_token,
          account: decoded.account,
          isAdmin: decoded.isAdmin,
          isSuper: decoded.isSuper
        };
        this.localStorage.add('shoppingUser', JSON.stringify(user));
        this.router.navigateByUrl('/home');
      }
    });
  }
}