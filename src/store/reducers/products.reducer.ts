import { Product } from "src/models";
import * as fromActions from "../actions/";
import { createSelector, createFeatureSelector } from "@ngrx/store";
import { LoadProductsSuccess } from "../actions/";

export interface ProductsState {
  data: Product[];
  loading: boolean;
  loaded: boolean;
}

const initialState: ProductsState = {
  data: [],
  loading: false,
  loaded: false
};

export function productsReducer(
  state = initialState,
  action: fromActions.ProductsAction
): ProductsState {
  switch (action.type) {
    case fromActions.LOAD_PRODUCTS:
      return{
        ...state,
        loading: true,
        loaded: false
      };
    case fromActions.LOAD_PRODUCTS_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false
      };
    case fromActions.LOAD_PRODUCTS_SUCCESS:
      return {
        data : (<LoadProductsSuccess>action).payload,
        loading: false,
        loaded: true
      };
  }

  return state;
}

//selectors

export const getProductsState = createFeatureSelector<ProductsState>(
  "products"
);
export const getProducts = createSelector(
  getProductsState,
  (state: ProductsState) => state.data
);

export const getProductsByCategories = createSelector(
  getProducts,
  (state: Product[]) =>
    state.reduce((prev, next) => {
      prev[next.category] = prev[next.category] || [];
      prev[next.category].push(next);
      return prev;
    }, {})
);

export const getProductById = (id: string) => {
  return createSelector(
    getProducts,
    (state: Product[]) => {
      return state.find(product => product.id === id);
    }
  );
};

export const getNewProducts = createSelector(
  getProducts,
  (state: Product[]) => state.filter(product => product.newOffer)
);

export const getProductAvailableSizes = (id: string) => {
  return createSelector(
    getProducts,
    (state: Product[]) => {
      return state
        .find(product => product.id === id)
        .sizes.filter(size => size.reserved === false);
    }
  );
};
