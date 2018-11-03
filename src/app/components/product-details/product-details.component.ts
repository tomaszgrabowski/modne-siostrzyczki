import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import * as fromReducers from "src/store/reducers";
import { Product } from "src/models";
import { getProductById } from "src/store/reducers";
import { ActivatedRoute } from "@angular/router";
import { faFire } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: "app-product-details",
  templateUrl: "./product-details.component.html",
  styleUrls: ["./product-details.component.css"]
})
export class ProductDetailsComponent implements OnInit {
  private product: Product;
  private id: string;
  private thumbnail: string;
  private faFire = faFire

  constructor(
    private store: Store<fromReducers.AppState>,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params=> this.id = params["id"]);
    this.store.select(getProductById(this.id)).subscribe(product=>{
      this.product = product;
      this.thumbnail = product.photos.find(image=>image.thumbnail).url;
    });

  }
}
