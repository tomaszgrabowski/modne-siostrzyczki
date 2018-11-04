import { ActionReducerMap, createSelector } from '@ngrx/store';
import * as fromProducts from "./products.reducer";
import * as fromOrder from "./order.reducer";

export interface AppState {
  products: fromProducts.ProductsState,
  order: fromOrder.OrderState
}

export const appReducer: ActionReducerMap<AppState> = {
  products: fromProducts.productsReducer,
  order: fromOrder.ordersReducer
}

export const getAppState = createSelector((state: AppState) => state);

