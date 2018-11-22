import { Effect, Actions } from "@ngrx/effects";
import { Observable } from "rxjs";
import { Action } from "@ngrx/store";
import { Injectable } from "@angular/core";
import * as fromActions from "src/store/actions";
import { switchMap, map } from "rxjs/operators";
import { HttpService } from "src/app/services/httpService";
import { Product } from "src/models";

@Injectable()
export class ProductsEffects {
  constructor(
    private actions: Actions,
    private productsService: HttpService
  ) {}

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
}
