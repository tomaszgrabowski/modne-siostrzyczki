import { ActionReducerMap, createSelector } from '@ngrx/store';
import * as fromProducts from "./products.reducer";

export interface AppState {
  products: fromProducts.ProductsState
}

export const appReducer: ActionReducerMap<AppState> = {
  products: fromProducts.productsReducer
}

export const getAppState = createSelector((state: AppState) => state);

