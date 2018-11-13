import { Component, OnInit } from "@angular/core";
import {
  faHome,
  faEnvelope,
  faShoppingCart,
  faMoneyCheckAlt
} from "@fortawesome/free-solid-svg-icons";
import { AppState, getOrderProductsCount } from "src/store/reducers";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { Order } from "src/models";

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
  private productsInCart: Observable<number>;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.productsInCart = this.store.select(getOrderProductsCount);
  }
}
