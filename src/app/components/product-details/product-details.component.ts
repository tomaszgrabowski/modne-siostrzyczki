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
import { ActivatedRoute, Router } from "@angular/router";
import { faFire } from "@fortawesome/free-solid-svg-icons";
import { ToastrService } from "ngx-toastr";
import { ConstantsService } from "src/app/services/constants.service";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { DomainResolverService } from "src/app/services/domain-resolver.service";

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
    private toastr: ToastrService,
    private router: Router,
    private domainResolver: DomainResolverService
  ) {}

  ngOnInit() {
    this.choosenSize = "Rozmiar";
    this.orderDisabled = true;
    this.route.params.subscribe(params => (this.id = params["id"]));
    this.store.select(getProductById(this.id)).subscribe(product => {
      if(!product){
        this.router.navigate(["/"]);
      }
      this.product = product;
      this.choosenImage = product.photos.find(image => image.thumbnail).url;
    });
    this.store
      .select(getProductAvailableSizes(this.product._id))
      .subscribe(sizes => (this.lastItem = sizes.length < 2));
  }

  chooseImage(image: ProductImage): void {
    this.choosenImage = image.url;
  }

  chooseSize(size: ProductSize): void {
    this.choosenSize = size.size;
    this.orderDisabled = this.choosenSize === "Rozmiar" ? true : false;
  }

  addToCart(product: Product): void {
    this.store.dispatch(
      new fromActions.AddProductToOrder({
        ...product,
        choosenSize: this.choosenSize
      })
    );
    this.toastr.success("Produkt dodano do koszyka...");
  }

  backToProductsList(): void {
    this.router.navigate(["/"]);
  }

  getImageUrl(image:string): SafeResourceUrl{
    return this.domainResolver.getResourceUrl(image);
  }
}
