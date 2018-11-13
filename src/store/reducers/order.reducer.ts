import { Order, Product } from "src/models";
import * as fromActions from "../actions";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export interface OrderState {
  data: Order;
  loading: boolean;
  loaded: boolean;
}

const initialState: OrderState = {
  data: {
    date: "",
    deliveryAddress: null,
    id: "",
    products: [],
    user: {
      address: {
        city: "",
        country: "",
        number: "",
        street: "",
        zip: ""
      },
      email: "",
      id: "",
      name: "",
      phone: "",
      surname: ""
    }
  },
  loading: false,
  loaded: false
};

export function ordersReducer(
  state = initialState,
  action: fromActions.OrdersAction
): OrderState {
  switch (action.type) {
    case fromActions.ADD_PRODUCT_TO_ORDER:
      return {
        data: {
          ...state.data,
          products: [...state.data.products, <Product>action.payload]
        },
        loaded: true,
        loading: true
      };
    case fromActions.REMOVE_PRODUCT_FROM_ORDER:
      const products = state.data.products.filter(product=>product.id !== action.payload.id);
      return {
        data: {
          ...state.data,
          products
        },
        loaded: true,
        loading: true
      };
  }

  return state;
}

export const getOrderState = createFeatureSelector<OrderState>("order");

export const getOrder = createSelector(
  getOrderState,
  (state: OrderState) => state.data
);

export const getOrderProducts = createSelector(
  getOrder,
  (state: Order) => state.products
);

export const getOrderProductsCount = createSelector(
  getOrderProducts,
  (state: Product[]) => state.length
);
