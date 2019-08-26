import {
    ActionReducerMap,
    createFeatureSelector,
    createSelector,
    MetaReducer,
  } from '@ngrx/store';
  import { storeFreeze } from 'ngrx-store-freeze';
  import * as fromRouter from '@ngrx/router-store';
  import { environment } from '../../../environments/environment';
  import {
    Params,
    RouterStateSnapshot,
    ActivatedRouteSnapshot,
  } from '@angular/router';
import {MaintenanceState, maintenanceReducer} from '../../maintenance/store';
import * as fromUrl from './router.reducer';
  
  // tslint:disable-next-line:no-empty-interface
  export interface AppState {}
  
  export const reducers: ActionReducerMap<AppState> = {
    // auth: authReducer,
    maintenance: maintenanceReducer,
    router: fromRouter.routerReducer,
    returnUrl: fromUrl.reducer,
  };
  
  export const metaReducers: MetaReducer<AppState>[] = !environment.production
    ? [storeFreeze]
    : [];
  
  export interface RouterStateUrl {
    url: string;
    queryParams: Params;
    params: Params;
    title: string;
  }
  
  export interface State {
    routerReducer: fromRouter.RouterReducerState<RouterStateUrl>;
    maintenanceReducer: MaintenanceState
  }

  export const getRouterState = createFeatureSelector<
    fromRouter.RouterReducerState<RouterStateUrl>
  >('routerReducer');
  
  export const selectRouter = createFeatureSelector<
    fromRouter.RouterReducerState<RouterStateUrl>
  >('router');
  
  export const selectUrl = createSelector(
    selectRouter,
    (state: fromRouter.RouterReducerState<RouterStateUrl>) => {
      return state.state.url.split('/');
    }
  );

  export class CustomSerializer
    implements fromRouter.RouterStateSerializer<RouterStateUrl> {
    serialize(routerState: RouterStateSnapshot): RouterStateUrl {
      const { url } = routerState;
      const { queryParams } = routerState.root;
  
      let state: ActivatedRouteSnapshot = routerState.root;
      while (state.firstChild) {
        state = state.firstChild;
      }
      const { params } = state;
      const title = '';
      return { url, queryParams, params, title };
    }
  }
  