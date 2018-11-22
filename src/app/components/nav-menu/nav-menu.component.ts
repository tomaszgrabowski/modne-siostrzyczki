import { Component, OnInit } from "@angular/core";
import {
  faHome,
  faEnvelope,
  faShoppingCart,
  faMoneyCheckAlt
} from "@fortawesome/free-solid-svg-icons";
import * as fromReducers from "src/store/reducers";
import * as fromActions from "src/store/actions";
import { Store } from "@ngrx/store";
import { tap, delay } from "rxjs/operators";
import { Router } from "@angular/router";

@Component({
  selector: "app-nav-menu",
  templateUrl: "./nav-menu.component.html",
  styleUrls: ["./nav-menu.component.css"]
})
export class NavMenuComponent implements OnInit {
  private activeRouteBorderStyle: string[] = ["active-route"];
  private faHome = faHome;
  private faEvenlope = faEnvelope;
  private faShoppingCart = faShoppingCart;
  private faMoneyCheckAlt = faMoneyCheckAlt;
  private productsInCart: number;
  private countClass: string[];
  private isLoggedIn: boolean;

  constructor(
    private store: Store<fromReducers.AppState>,
    private router: Router
  ) {}

  ngOnInit() {
    this.store
      .select(fromReducers.getOrderProductsCount)
      .pipe(
        tap(val => {
          this.productsInCart = val;
          this.countClass = ["nav-item", "pop-out"];
        }),
        delay(300),
        tap(val => {
          this.countClass = ["nav-item"];
        })
      )
      .subscribe(count => (this.productsInCart = count));
    this.store
      .select(fromReducers.isLoggedIn)
      .subscribe(isLoggedIn => (this.isLoggedIn = isLoggedIn));
  }

  onLogout(): void {
    this.store.dispatch(new fromActions.LogoutUser());
    this.router.navigate(["/"]);
  }
}
