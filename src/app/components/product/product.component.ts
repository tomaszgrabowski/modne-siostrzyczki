import { Component, OnInit, Input } from "@angular/core";
import { Product, ProductSize } from "src/models";
import { faFire } from '@fortawesome/free-solid-svg-icons';
import { Store } from "@ngrx/store";
import * as fromReducers from "src/store/reducers";
import { getProductAvailableSizes } from "src/store/reducers";

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.css"]
})
export class ProductComponent implements OnInit {
  @Input()
  product: Product;
  faFire = faFire;
  lastItem: boolean;
  availableSizes: ProductSize[];

  constructor(private store: Store<fromReducers.AppState>) {}

  ngOnInit() {
    this.store.select(getProductAvailableSizes(this.product._id)).subscribe(sizes=> this.availableSizes = sizes);
    this.lastItem = this.availableSizes.length < 2;
  }
}
