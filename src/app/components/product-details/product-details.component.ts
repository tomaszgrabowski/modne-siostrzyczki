import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import * as fromReducers from "src/store/reducers";
import * as fromActions from "src/store/actions";
import { Product, ProductImage, ProductSize } from "src/models";
import {
  getProductById,
  getProductAvailableSizes,
  getOrder
} from "src/store/reducers";
import { ActivatedRoute } from "@angular/router";
import { faFire } from "@fortawesome/free-solid-svg-icons";
import { ToastrService } from "ngx-toastr";

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
  private orderDisabled: boolean;

  constructor(
    private store: Store<fromReducers.AppState>,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.choosenSize = "Rozmiar";
    this.orderDisabled = true;
    this.route.params.subscribe(params => (this.id = params["id"]));
    this.store.select(getProductById(this.id)).subscribe(product => {
      this.product = product;
      this.choosenImage = product.photos.find(image => image.thumbnail).url;
    });
    this.store
      .select(getProductAvailableSizes(this.product.id))
      .subscribe(sizes => (this.lastItem = sizes.length < 2));
  }

  private chooseImage(image: ProductImage): void {
    this.choosenImage = image.url;
  }

  private chooseSize(size: ProductSize): void {
    this.choosenSize = size.size;
    this.orderDisabled = this.choosenSize === "Rozmiar" ? true : false;
  }

  private addToCart(product: Product): void {
    this.store.dispatch(
      new fromActions.AddProductToOrder({
        ...product,
        choosenSize: this.choosenSize
      })
    );
    this.store.select(getOrder).subscribe(order => console.log(order));
    this.toastr.success("Produkt dodano do koszyka...","Infomracja");
  }
}
