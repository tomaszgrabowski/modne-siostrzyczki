import { Effect, Actions } from "@ngrx/effects";
import { Observable } from "rxjs";
import { Action } from "@ngrx/store";
import { Injectable } from "@angular/core";
import * as fromActions from "src/store/actions";
import { switchMap, map } from "rxjs/operators";
import { HttpService } from "src/app/services/httpService";
import { User } from "src/models";

@Injectable()
export class UserEffects {
  constructor(private actions: Actions, private productsService: HttpService) {}

  @Effect()
  loadUser: Observable<Action> = this.actions
    .ofType(fromActions.LOGIN_USER)
    .pipe(
      switchMap(action => {
        const _action = <fromActions.LoginUser>action;
        console.log("load user effect");
        return this.productsService
          .get(
            `${HttpService.usersRoute}?email=${
              _action.payload.email
            }&password=${_action.payload.password}`
          )
          .pipe(
            map((users: User[]) => {
              console.log(users);
              if (users.length > 0) {
                return new fromActions.LoginUserSuccess(users[0]);
              }
              return new fromActions.LoginUserFail();
            })
          );
      })
    );
}
