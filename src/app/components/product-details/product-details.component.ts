import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import * as fromReducers from "src/store/reducers";
import { Product, ProductImage } from "src/models";
import { getProductById, getProductAvailableSizes } from "src/store/reducers";
import { ActivatedRoute } from "@angular/router";
import { faFire } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-product-details",
  templateUrl: "./product-details.component.html",
  styleUrls: ["./product-details.component.css"]
})
export class ProductDetailsComponent implements OnInit {
  private product: Product;
  private id: string;
  private choosenImage: string;
  private faFire = faFire;
  private lastItem: boolean;

  constructor(
    private store: Store<fromReducers.AppState>,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => (this.id = params["id"]));
    this.store.select(getProductById(this.id)).subscribe(product => {
      this.product = product;
      this.choosenImage = product.photos.find(image => image.thumbnail).url;
    });
    this.store
      .select(getProductAvailableSizes(this.product.id))
      .subscribe(sizes => (this.lastItem = sizes.length < 2));
  }

  private chooseImage(image:ProductImage):void{
    this.choosenImage = image.url;
  }
}
