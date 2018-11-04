import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import * as fromReducers from "src/store/reducers";
import * as fromActions from "src/store/actions";
import { Product, ProductImage, ProductSize } from "src/models";
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
  private choosenSize: string;

  constructor(
    private store: Store<fromReducers.AppState>,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.choosenSize = "Rozmiar";
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

  private chooseSize(size: ProductSize):void{
    this.choosenSize = size.size;
  }

  private addToCart(product: Product): void{
    this.store.dispatch(new fromActions.AddProductToOrder(product));
    this.store.subscribe(x=>console.log(x));
  }
}
