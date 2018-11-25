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
