import { Action } from "@ngrx/store";
import { Order, Product } from "src/models";

export const PLACE_ORDER = "[ORDERS] Place Order";
export const CLEAN_ORDER = "[ORDERS] Clean Order";
export const ADD_PRODUCT_TO_ORDER = "[ORDERS] Add Product To Order";
export const REMOVE_PRODUCT_FROM_ORDER = "[ORDERS] Remove Product From Order";

export class PlaceOrder implements Action {
  public readonly type: string = PLACE_ORDER;
  constructor(public payload: Order) {}
}

export class CleanOrder implements Action {
  public readonly type: string = CLEAN_ORDER;
}

export class AddProductToOrder implements Action {
  public readonly type: string = ADD_PRODUCT_TO_ORDER;
  constructor(public payload: Product) {}
}

export class RemoveProductFromOrder implements Action {
  public readonly type: string = REMOVE_PRODUCT_FROM_ORDER;
  constructor(public payload: Product) {}
}

//action types

export type OrdersAction = PlaceOrder | CleanOrder | AddProductToOrder | RemoveProductFromOrder;
