import { Order } from "src/models";
import * as fromActions from '../actions';

export interface OrdersState{
  data: Order[];
  loading: boolean;
  loaded: boolean;
}

export const initialState: OrdersState = {
  data: [],
  loading: false,
  loaded: false
};

export function ordersReducer(
  state = initialState,
  action: fromActions.OrdersAction
): OrdersState {
  switch (action.type) {
    case fromActions.LOAD_ORDERS:
      ({
        ...state,
        loading: true,
        loaded: false
      });
    case fromActions.LOAD_ORDERS_ERROR:
      ({
        ...state,
        loading: false,
        loaded: false
      });
    case fromActions.LOAD_ORDERS_SUCCESS:
      ({
        ...state,
        loading: false,
        loaded: true
      });
  }

  return state;
}