import { Component, OnInit } from "@angular/core";
import { Product } from "src/models";
import * as fromReducers from "src/store/reducers";
import * as fromActions from "src/store/actions";
import { Store } from "@ngrx/store";
import { HttpService } from "src/app/services/httpService";

@Component({
  selector: "app-product-add",
  templateUrl: "./product-add.component.html",
  styleUrls: ["./product-add.component.css"]
})
export class ProductAddComponent implements OnInit {
  private placeholder: string = "https://via.placeholder.com/150";
  private img1: string;
  private img2: string;
  private img3: string;

  constructor(private store: Store<fromReducers.AppState>, private http: HttpService) { }

  ngOnInit() { }

  onImg1Change(event) {
    const formData = new FormData();
    formData.append("upload", event.target.files[0], event.target.files[0].name);
    this.http.post(HttpService.uploadRoute, formData).subscribe(res => this.img1 = res+"");
  }

  onSubmit(form) {
    console.log(form);
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
          url: this.img1
        },
        {
          thumbnail: false,
          url: form.img2
        },
        {
          thumbnail: false,
          url: form.img3
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
