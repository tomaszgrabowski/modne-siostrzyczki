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
      ({
        ...state,
        data: state.data.products.push(<Product>action.payload),
        loading: false,
        loaded: true
      });
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
