import { Component, OnInit } from "@angular/core";
import {
  faHome,
  faEnvelope,
  faShoppingCart,
  faMoneyCheckAlt
} from "@fortawesome/free-solid-svg-icons";
import { AppState, getOrderProductsCount } from "src/store/reducers";
import { Store } from "@ngrx/store";
import { tap, delay } from "rxjs/operators";

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

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.select(getOrderProductsCount).pipe(
      tap(val => {
        this.productsInCart = val;
        this.countClass = ["nav-item", "pop-out"];
      }),
      delay(300),
      tap(val => {
        this.countClass = ["nav-item"];
      })
    ).subscribe(count=>this.productsInCart = count);
  }
}
