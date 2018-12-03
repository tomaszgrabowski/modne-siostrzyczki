import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import * as fromReducers from 'src/store/reducers';
import { isLoggedIn } from "src/store/reducers";

@Injectable({
  providedIn: "root"
})
export class LoggedinGuardService implements CanActivate {
  constructor(private store: Store<fromReducers.AppState>) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.store.select(isLoggedIn);
  }
}
