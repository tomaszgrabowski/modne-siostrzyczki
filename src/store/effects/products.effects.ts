import { Effect, Actions } from "@ngrx/effects";
import { Observable } from "rxjs";
import { Action } from "@ngrx/store";
import { Injectable } from "@angular/core";
import * as fromActions from 'src/store/actions';
import { switchMap, map } from "rxjs/operators";
import { ProductsService } from "src/app/services/products.service";

@Injectable()
export class ProductsEffects {
  constructor(private actions: Actions, private productsService: ProductsService) {}

  @Effect()
  loadProduct: Observable<Action> = this.actions
  .ofType(fromActions.LOAD_PRODUCTS)
  .pipe(
    switchMap(action => this.productsService.loadProducts()),
    map((products: any)=> new fromActions.LoadProductsSuccess(products))
  )
}
