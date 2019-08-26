import { map, distinctUntilChanged, filter } from 'rxjs/operators';
import {
  Directive,
  Input,
  OnInit,
  OnDestroy,
  DoCheck,
  Inject,
  HostBinding,
  forwardRef,
} from '@angular/core';
import { ErrorOptions } from './ngxerrors';
import { toArray } from './utils/toArray';
import { Subscription, Subject, Observable, combineLatest } from 'rxjs';
import { NgxErrorsDirective } from './ngxerrors.directive';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[ngxError]',
})
export class NgxErrorDirective implements OnInit, OnDestroy, DoCheck {
  @Input()
  set ngxError(value: ErrorOptions) {
    this.errorNames = toArray(value);
  }

  @Input()
  set when(value: ErrorOptions) {
    this.rules = toArray(value);
  }

  @HostBinding('hidden')
  hidden = true;

  rules: string[] = [];

  errorNames: string[] = [];

  subscription: Subscription;

  // tslint:disable-next-line:variable-name
  _states: Subject<string[]>;

  states: Observable<string[]>;

  constructor(
    @Inject(forwardRef(() => NgxErrorsDirective))
    private ngxErrors: NgxErrorsDirective
  ) {}

  ngOnInit() {
    this._states = new Subject<string[]>();
    this.states = this._states.asObservable().pipe(distinctUntilChanged());

    const errors = this.ngxErrors.subject.pipe(
      filter(Boolean),
      // tslint:disable-next-line:no-bitwise
      filter(obj => !!~this.errorNames.indexOf(obj.errorName))
    );

    const states = this.states.pipe(
      // tslint:disable-next-line:no-shadowed-variable
      map(states => this.rules.every(rule => !!~states.indexOf(rule)))
    );

    this.subscription = combineLatest([states, errors])
      // tslint:disable-next-line:no-shadowed-variable
      .subscribe(([states, errors]) => {
        this.hidden = !(states && errors.control.hasError(errors.errorName));
      });
  }

  ngDoCheck() {
    this._states.next(
      this.rules.filter(rule => (this.ngxErrors.control as any)[rule])
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
