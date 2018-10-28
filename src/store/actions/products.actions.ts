import { Action } from "@ngrx/store";
import { Product } from "src/models";

export const LOAD_PRODUCTS = "[PRODUCTS] Load Products";
export const LOAD_PRODUCTS_SUCCESS = "[PRODUCTS] Load Products Success";
export const LOAD_PRODUCTS_ERROR = "[PRODUCTS] Load Products Error";

export class LoadProducts implements Action {
  public readonly type: string = LOAD_PRODUCTS;
}

export class LoadProductsSuccess implements Action {
  public readonly type: string = LOAD_PRODUCTS_SUCCESS;
  constructor(public payload: Product[]) {}
}

export class LoadProductsFail implements Action {
  public readonly type: string = LOAD_PRODUCTS_ERROR;
  constructor(public payload: any) {}
}

//action types

export type ProductsAction = LoadProducts | LoadProductsSuccess | LoadProductsFail;
