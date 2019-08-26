import { Action } from '@ngrx/store';
import { NavigationExtras } from '@angular/router';

export const GO = '[Router] Go';
export const BACK = '[Router] Back';
export const FORWARD = '[Router] Forward';
export const RETURNURLSET = '[Router] set return url';

export class Go implements Action {
  readonly type = GO;
  constructor(
    public payload: {
      path: any[];
      query?: object;
      extras?: NavigationExtras;
    }
  ) {}
}

export class Back implements Action {
  readonly type = BACK;
}

export class Forward implements Action {
  readonly type = FORWARD;
}

export class SetReturnUrl implements Action {
  readonly type = RETURNURLSET;

  constructor(public payload: { url: string }) {}
}

export type Actions = Go | Back | Forward | SetReturnUrl;