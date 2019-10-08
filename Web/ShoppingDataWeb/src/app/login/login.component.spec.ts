import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService, LocalStorageService } from '../services';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;
  let routerSpy;
  let authenticationService: AuthenticationService;
  let authSpy;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        ReactiveFormsModule,
        HttpClientModule,
        RouterTestingModule
      ],
      providers:[
        AuthenticationService,
        LocalStorageService],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    router = TestBed.get(Router);
    routerSpy = spyOn(router, 'navigateByUrl');
    authenticationService = TestBed.get(AuthenticationService);
    authSpy = spyOn(authenticationService, 'clearSession');
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('when component loads', () => {
    it('should have the user list should be empty ', () => {
      expect(component.users).toEqual([]);
    });
  });

  describe('when the ngOnitLifeCycleHook is called ', () => {
    it('it should call the authentication service', () => {
      component.ngOnInit();
      expect(authSpy).toHaveBeenCalled();
    });
  });

  describe('when the authenticate user function is called', () => {
    it('should route to the next page', () => {
      component.authenticateUser();
      expect(routerSpy).toHaveBeenCalled();
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
