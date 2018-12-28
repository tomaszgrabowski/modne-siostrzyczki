import { Action } from "@ngrx/store";
import { Product } from "src/models";

export const LOAD_PRODUCTS = "[PRODUCTS] Load Products";
export const LOAD_PRODUCTS_SUCCESS = "[PRODUCTS] Load Products Success";
export const LOAD_PRODUCTS_FAIL = "[PRODUCTS] Load Products Fail";
export const ADD_PRODUCT = "[PRODUCTS] Add Product";
export const ADD_PRODUCT_SUCCESS = "[PRODUCTS] Add Product Sucess";
export const ADD_PRODUCT_FAIL = "[PRODUCTS] Add Product Fail";
export const REMOVE_PRODUCT = "[PRODUCTS] Remove Product";
export const REMOVE_PRODUCT_SUCCESS = "[PRODUCTS] Remove Product Success";
export const REMOVE_PRODUCT_FAIL = "[PRODUCTS] Remove Product Fail";


export class LoadProducts implements Action {
  public readonly type: string = LOAD_PRODUCTS;
}

export class LoadProductsSuccess implements Action {
  public readonly type: string = LOAD_PRODUCTS_SUCCESS;
  constructor(public payload: Product[]) {}
}

export class LoadProductsFail implements Action {
  public readonly type: string = LOAD_PRODUCTS_FAIL;

}

export class AddProduct implements Action {
  public readonly type: string = ADD_PRODUCT;
  constructor(public payload: Product) {}
}

export class AddProductSuccess implements Action {
  public readonly type: string = ADD_PRODUCT_SUCCESS;
  constructor(public payload: Product) {}
}

export class AddProductFail implements Action {
  public readonly type: string = ADD_PRODUCT_FAIL;
}

export class RemoveProduct implements Action {
  public readonly type: string = REMOVE_PRODUCT;
  constructor(public payload: Product) {}
}

export class RemoveProductSuccess implements Action {
  public readonly type: string = REMOVE_PRODUCT_SUCCESS;
  constructor(public payload: Product) {}
}

export class RemoveProductFail implements Action {
  public readonly type: string = REMOVE_PRODUCT_FAIL;
}

//action types

export type ProductsAction =
  | LoadProducts
  | LoadProductsSuccess
  | LoadProductsFail
  | AddProduct
  | AddProductSuccess
  | AddProductFail
  | RemoveProduct
  | RemoveProductSuccess
  | RemoveProductFail;
