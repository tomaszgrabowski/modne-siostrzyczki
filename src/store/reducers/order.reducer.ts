import { Order, Product } from "src/models";
import * as fromActions from "../actions";

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
        data: state.data.products.push((<Product>action.payload)),
        loading: false,
        loaded: true
      });
  }

  return state;
}
