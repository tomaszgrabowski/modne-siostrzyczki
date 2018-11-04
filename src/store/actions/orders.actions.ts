import { Action } from "@ngrx/store";
import { Order } from "src/models";

export const LOAD_ORDERS = "[ORDERS] Load Products";
export const LOAD_ORDERS_SUCCESS = "[ORDERS] Load Products Success";
export const LOAD_ORDERS_ERROR = "[ORDERS] Load Products Error";

export class LoadOrders implements Action {
  public readonly type: string = LOAD_ORDERS;
}

export class LoadOrdersSuccess implements Action {
  public readonly type: string = LOAD_ORDERS_SUCCESS;
  constructor(public payload: Order[]) {}
}

export class LoadOrdersFail implements Action {
  public readonly type: string = LOAD_ORDERS_ERROR;
  constructor(public payload: any) {}
}

//action types

export type OrdersAction = LoadOrders | LoadOrdersSuccess | LoadOrdersFail;
