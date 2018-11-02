import { Component, OnInit, Input } from "@angular/core";
import { Product, ProductSize } from "src/models";
import * as moment from "moment";

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.css"]
})
export class ProductComponent implements OnInit {
  @Input()
  product: Product;

  lastItem: boolean;
  availableSizes: ProductSize[];

  constructor() {}

  ngOnInit() {
    this.availableSizes = this.product.sizes.filter(
      item => item.reserved === false
    );
    this.lastItem = this.availableSizes.length < 2;
  }
}
