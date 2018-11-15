import { Effect, Actions } from "@ngrx/effects";
import { Observable } from "rxjs";
import { Action } from "@ngrx/store";
import { Injectable } from "@angular/core";
import * as fromActions from "src/store/actions";
import { switchMap, map } from "rxjs/operators";
import { ProductsService } from "src/app/services/products.service";
import { Product } from "src/models";

@Injectable()
export class ProductsEffects {
  constructor(
    private actions: Actions,
    private productsService: ProductsService
  ) {}

  @Effect()
  loadProduct: Observable<Action> = this.actions
    .ofType(fromActions.LOAD_PRODUCTS)
    .pipe(
      switchMap(() => {
        return this.productsService.loadProducts().pipe(
          map((products: Product[]) => {
            console.log(products);
            return new fromActions.LoadProductsSuccess(products);
          })
        );
      })
    );
}
