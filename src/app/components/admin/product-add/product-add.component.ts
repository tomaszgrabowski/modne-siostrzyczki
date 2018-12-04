import { Component, OnInit } from "@angular/core";
import { Product } from "src/models";
import { v4 as uuid } from "uuid";
import * as fromReducers from "src/store/reducers";
import * as fromActions from "src/store/actions";
import { Store } from "@ngrx/store";

@Component({
  selector: "app-product-add",
  templateUrl: "./product-add.component.html",
  styleUrls: ["./product-add.component.css"]
})
export class ProductAddComponent implements OnInit {
  private placeholder: string = "https://via.placeholder.com/150";

  constructor(private store: Store<fromReducers.AppState>) {}

  ngOnInit() {}

  onSubmit(form) {
    const product: Product = {
      _id: null,
      category: form.category,
      date: new Date().toISOString(),
      name: form.name,
      description: form.description,
      newOffer: true,
      photos: [
        {
          thumbnail: true,
          url: this.placeholder
        }
      ],
      price: form.price,
      sizes: form.sizes.split(",").map(size => ({
        size,
        reserved: false
      }))
    };
    this.store.dispatch(new fromActions.AddProduct(product));
    // move to admin product list
  }
}
