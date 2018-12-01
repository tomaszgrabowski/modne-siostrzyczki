import { Effect, Actions } from "@ngrx/effects";
import { Observable } from "rxjs";
import { Action } from "@ngrx/store";
import { Injectable } from "@angular/core";
import * as fromActions from "src/store/actions";
import { switchMap, map, mapTo } from "rxjs/operators";
import { HttpService } from "src/app/services/httpService";
import { User } from "src/models";

@Injectable()
export class UserEffects {
  constructor(private actions: Actions, private httpService: HttpService) {}

  @Effect()
  loginUser: Observable<Action> = this.actions
    .ofType(fromActions.LOGIN_USER)
    .pipe(
      switchMap(action => {
        const _action = <fromActions.LoginUser>action;
        return this.httpService
          .get(
            `${HttpService.loginRoute}?email=${
              _action.payload.email
            }&password=${_action.payload.password}`
          )
          .pipe(
            map((user: User) => {
              console.log(user);
              if (user) {
                return new fromActions.LoginUserSuccess(user);
              }
              return new fromActions.LoginUserFail();
            })
          );
      })
    );

    @Effect()
    registerUser: Observable<Action> = this.actions
      .ofType(fromActions.REGISTER_USER)
      .pipe(
        switchMap(action => {
          const _action = <fromActions.RegisterUser>action;
          return this.httpService.post(HttpService.usersRoute, _action.payload)
          .pipe(
            mapTo(new fromActions.LoginUserSuccess(_action.payload))
          );
        })
      );
}
