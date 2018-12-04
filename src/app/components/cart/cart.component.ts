import { Component, OnInit } from "@angular/core";
import { Product } from "src/models";
import { Store } from "@ngrx/store";
import { ToastrService } from "ngx-toastr";
import {
  AppState,
  getOrderProductsCount,
  getOrderProducts,
  getOrder,
  getUser,
  isLoggedIn
} from "src/store/reducers";
import { Observable } from "rxjs";
import { faTrashAlt, faMoneyCheckAlt } from "@fortawesome/free-solid-svg-icons";
import * as fromActions from "src/store/actions";
import { Router } from "@angular/router";
import { SafeResourceUrl } from "@angular/platform-browser";
import { DomainResolverService } from "src/app/services/domain-resolver.service";

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
  private isLoggedIn: Observable<boolean>;

  constructor(
    private store: Store<AppState>,
    private toastr: ToastrService,
    private router: Router,
    private domainResolver: DomainResolverService
  ) {}

  ngOnInit() {
    this.products = this.store.select(getOrderProducts);
    this.productsCount = this.store.select(getOrderProductsCount);
    this.isLoggedIn = this.store.select(isLoggedIn);
  }

  remove(product: Product): void {
    this.store.dispatch(new fromActions.RemoveProductFromOrder(product));
  }

  placeOrder(): void {
    this.store
      .select(getOrder)
      .subscribe(order => {
        this.store
          .select(getUser)
          .subscribe(user => {
            order.user = user;
            this.store.dispatch(new fromActions.PlaceOrder(order));
            this.toastr.success("Złożono zamówienie...");
            this.router.navigate(["/"]); //strona podziękowań?
          })
          .unsubscribe();
      })
      .unsubscribe();
  }
}
