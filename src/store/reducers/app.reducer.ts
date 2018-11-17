import { ActionReducerMap, createSelector } from '@ngrx/store';
import * as fromProducts from "./products.reducer";
import * as fromOrder from "./order.reducer";
import * as fromUser from './user.reducer';

export interface AppState {
  products: fromProducts.ProductsState,
  order: fromOrder.OrderState,
  user: fromUser.UserState
}

export const appReducer: ActionReducerMap<AppState> = {
  products: fromProducts.productsReducer,
  order: fromOrder.ordersReducer,
  user: fromUser.userReducer
}

export const getAppState = createSelector((state: AppState) => state);

