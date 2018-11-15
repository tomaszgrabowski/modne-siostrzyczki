import { Component, OnInit } from "@angular/core";
import { Product } from "src/models";
import { Store } from "@ngrx/store";
import {
  AppState,
  getOrderProductsCount,
  getOrderProducts,
  getOrder
} from "src/store/reducers";
import { Observable } from "rxjs";
import { faTrashAlt, faMoneyCheckAlt } from "@fortawesome/free-solid-svg-icons";
import * as fromActions from "src/store/actions";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"]
})
export class CartComponent implements OnInit {
  private products: Observable<Product[]>;
  private productsCount: Observable<number>;
  private faTrash = faTrashAlt;
  private faMoneyCheckAlt = faMoneyCheckAlt;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.products = this.store.select(getOrderProducts);
    this.productsCount = this.store.select(getOrderProductsCount);
  }

  private remove(product: Product): void {
    this.store.dispatch(new fromActions.RemoveProductFromOrder(product));
  }

  private placeOrder(): void {
    // const order = this.store
    //   .select(getOrder)
    //   .subscribe(order =>
    //     this.store.dispatch(new fromActions.PlaceOrder(order))
    //   );
  }
}
