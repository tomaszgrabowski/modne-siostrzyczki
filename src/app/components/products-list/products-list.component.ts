import { Component, OnInit, HostBinding } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import * as fromReducers from "src/store/reducers";
import { getProducts, getProductsByCategories } from "src/store/reducers/products.reducer";
import { Product, Category } from "src/models";

@Component({
  selector: "app-products-list",
  templateUrl: "./products-list.component.html",
  styleUrls: ["./products-list.component.css"]
})
export class ProductsListComponent implements OnInit {
  @HostBinding("attr.class")
  cssClass = "row";

  private products: Observable<Product[]>;
  private amount: number;
  private productsByCategory: any;
  private categories: string[];

  constructor(private store: Store<fromReducers.AppState>) {}

  ngOnInit() {
    //this.products = this.store.select(getProducts);
    this.store.select(getProductsByCategories).subscribe(_categories=>{
      console.log(_categories);
      this.categories = Object.keys(_categories);
      this.productsByCategory = _categories;
    })
    //this.productsByCategory = this.store.select(getProductsByCategories);
  }
}
