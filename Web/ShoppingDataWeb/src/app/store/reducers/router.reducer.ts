import * as fromActions from '../actions/router.actions';
import { createSelector, createFeatureSelector } from '@ngrx/store';

export const initialState = '/home';

export function reducer(
  state = initialState,
  action: fromActions.Actions
): string {
  switch (action.type) {
    case fromActions.RETURNURLSET:
      return action.payload.url;
    default:
      return state;
  }
}

export const getReturnUrlState = createFeatureSelector<string>('returnUrl');

export const getReturnUrl = createSelector(
  getReturnUrlState,
  (state: string) => {
    return state;
  }
);
