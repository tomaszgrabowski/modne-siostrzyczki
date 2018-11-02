import { Component, OnInit, Input } from "@angular/core";
import { Product } from "src/models";
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
  newItem: boolean;
  constructor() {}

  ngOnInit() {
    this.lastItem = this.product.sizes.filter(item=>item.reserved===false).length < 2;
    console.log(this.product.sizes.filter(item=>item.reserved===false).length);
    this.newItem =
      moment(moment.now())
        .diff(moment(this.product.date), "days")
        .valueOf() < 7;
  }
}
