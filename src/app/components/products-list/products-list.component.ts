import { Component, OnInit, HostBinding } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import * as fromReducers from "src/store/reducers";
import { getProducts } from "src/store/reducers/products.reducer";
import { Product } from "src/models";

@Component({
  selector: "app-products-list",
  templateUrl: "./products-list.component.html",
  styleUrls: ["./products-list.component.css"]
})
export class ProductsListComponent implements OnInit {
  @HostBinding('attr.class') cssClass = 'row';
  private products: Observable<Product[]>;
  constructor(private store: Store<fromReducers.AppState>) {}

  ngOnInit() {
    this.products = this.store.select(getProducts);
  }
}
