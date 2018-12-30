import { Effect, Actions } from "@ngrx/effects";
import { Observable } from "rxjs";
import { Action } from "@ngrx/store";
import { Injectable } from "@angular/core";
import * as fromActions from "src/store/actions";
import { switchMap, map, mapTo } from "rxjs/operators";
import { HttpService } from "src/app/services/httpService";
import { Product } from "src/models";

@Injectable()
export class ProductsEffects {
  constructor(private actions: Actions, private productsService: HttpService) { }

  @Effect()
  loadProducts: Observable<Action> = this.actions
    .ofType(fromActions.LOAD_PRODUCTS)
    .pipe(
      switchMap(() => {
        return this.productsService.get(HttpService.productsRoute).pipe(
          map((products: Product[]) => {
            return new fromActions.LoadProductsSuccess(products);
          })
        );
      })
    );

  @Effect()
  addProduct: Observable<Action> = this.actions
    .ofType(fromActions.ADD_PRODUCT)
    .pipe(
      switchMap(action => {
        const _action = <fromActions.AddProduct>action;
        return this.productsService
          .post(HttpService.productsRoute, _action.payload, {
            responseType: "text"
          })
          .pipe(mapTo(new fromActions.AddProductSuccess(_action.payload)));
      })
    );

  @Effect()
  updateProduct: Observable<Action> = this.actions
    .ofType(fromActions.UPDATE_PRODUCT)
    .pipe(
      switchMap(action => {
        const _action = <fromActions.UpdateProduct>action;
        return this.productsService
          .post(HttpService.productsRoute, _action.payload, {
            responseType: "text"
          })
          .pipe(mapTo(new fromActions.UpdateProductSuccess(_action.payload)));
      })
    );

  @Effect()
  removeProduct: Observable<Action> = this.actions
    .ofType(fromActions.REMOVE_PRODUCT)
    .pipe(
      switchMap(action => {
        const _action = <fromActions.RemoveProduct>action;
        return this.productsService
          .delete(HttpService.productsRoute, _action.payload, {
            responseType: "text"
          })
          .pipe(mapTo(new fromActions.RemoveProductSuccess(_action.payload)));
      })
    );
}
