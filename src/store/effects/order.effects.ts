import { Effect, Actions } from "@ngrx/effects";
import { Observable } from "rxjs";
import { Action } from "@ngrx/store";
import { Injectable } from "@angular/core";
import * as fromActions from "src/store/actions";
import { switchMap, map } from "rxjs/operators";
import { HttpService } from "src/app/services/httpService";

@Injectable()
export class OrderEffects {
  constructor(private actions: Actions, private productsService: HttpService) {}

  @Effect()
  placeOrder: Observable<Action> = this.actions
    .ofType(fromActions.PLACE_ORDER)
    .pipe(
      switchMap(order => {
        return this.productsService
          .post("orders", (<fromActions.PlaceOrder>order).payload)
          .pipe(
            map(() => {
              return new fromActions.CleanOrder();
            })
          );
      })
    );
}
