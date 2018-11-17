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
        city: "Gdańsk",
        country: "Polska",
        number: "24/35",
        street: "Guderskiego",
        zip: "80-180"
      },
      email: "tomaszgrabowski07@gmail.com",
      id: "f2478c28-9329-5fd0-a7b0-35eb8de6eb80",
      name: "Tomasz",
      phone: "501466878",
      surname: "Grabowski"
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
          products: [...state.data.products, (<fromActions.AddProductToOrder>action).payload]
        },
        loaded: true,
        loading: true
      };
    case fromActions.REMOVE_PRODUCT_FROM_ORDER:
      const index = state.data.products.indexOf((<fromActions.RemoveProductFromOrder>action).payload);
      state.data.products.splice(index,1);

      return {
        data: {
          ...state.data,
          products: [...state.data.products]
        },
        loaded: true,
        loading: true
      };
    case fromActions.PLACE_ORDER:
      //send order to db and email
      //clean order
      return state;

    case fromActions.CLEAN_ORDER:
      return initialState;
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

export const getGruppedOrderProducts = createSelector(
  getOrder,
  (state: Order) => {
    const gruppedProducts = state.products.reduce((prev, next) => {
      prev[next.choosenSize] = prev[next.choosenSize] || [];
      prev[next.choosenSize].push(next);
      return prev;
    }, {});
    return Object.keys(gruppedProducts).map(key=> {
      return {
        key,
        value: gruppedProducts[key]
      }
    })
  }
);

export const getOrderProductsCount = createSelector(
  getOrderProducts,
  (state: Product[]) => state.length
);
