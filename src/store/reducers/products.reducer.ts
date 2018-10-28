import { Product } from "src/models";
import * as fromActions from "../actions/";
import { createSelector, createFeatureSelector } from "@ngrx/store";

export interface ProductsState {
  data: Product[];
  loading: boolean;
  loaded: boolean;
}

export const initialState: ProductsState = {
  data: [
    {
      id: "1818b6ee-89a6-5ae3-8715-71d1dfda9277",
      name: "Różowe buciki maxi",
      photoUrls: [
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150"
      ],
      price: 130,
      sizes: ["24", "24", "25", "25", "26", "27"]
    },
    {
      id: "9f59a90a-77c4-5d9a-a25a-1982107de53c",
      name: "Szare buciki maxi",
      photoUrls: [
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150"
      ],
      price: 130,
      sizes: ["24", "24", "25", "25", "26", "27"]
    },
    {
      id: "498bd6ff-b8e6-50cf-acfd-6903007e809a",
      name: "Bluzka z myszką Minnie",
      photoUrls: [
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150"
      ],
      price: 80,
      sizes: ["S", "S", "M", "M", "L", "L"]
    },
    {
      id: "0d71d6e5-0aec-51fc-872a-df1e90d5d7b5",
      name: "Bluzka z myszką Mickey",
      photoUrls: [
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150"
      ],
      price: 75,
      sizes: ["S", "S", "M", "M", "L", "L"]
    }
  ],
  loading: false,
  loaded: false
};

export function productsReducer(
  state = initialState,
  action: fromActions.ProductsAction
): ProductsState {
  switch (action.type) {
    case fromActions.LOAD_PRODUCTS:
      ({
        ...state,
        loading: true,
        loaded: false
      });
    case fromActions.LOAD_PRODUCTS_ERROR:
      ({
        ...state,
        loading: false,
        loaded: false
      });
    case fromActions.LOAD_PRODUCTS_SUCCESS:
      ({
        ...state,
        loading: false,
        loaded: true
      });
  }

  return state;
}

//selectors

export const getProductsState = createFeatureSelector<ProductsState>('products');
export const getProducts = createSelector(
  getProductsState,
  (state: ProductsState) => state.data
);
