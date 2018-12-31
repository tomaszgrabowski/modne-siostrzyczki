import { Component, OnInit } from "@angular/core";
import { Product, Category } from "src/models";
import * as fromReducers from "src/store/reducers";
import * as fromActions from "src/store/actions";
import { Store } from "@ngrx/store";
import { HttpService } from "src/app/services/httpService";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { v4 as uuid } from 'uuid';

@Component({
  selector: "app-product-add",
  templateUrl: "./product-add.component.html",
  styleUrls: ["./product-add.component.css"]
})
export class ProductAddComponent implements OnInit {
  private images: any[] = [];
  private categories: string[];

  constructor(
    private store: Store<fromReducers.AppState>,
    private http: HttpService,
    private toastr: ToastrService,
    private router: Router
    ) {
      this.categories = Object.keys(Category)
    }

  ngOnInit() { }

  onImgChange(event) {
    const formData = new FormData();
    formData.append("upload", event.target.files[0], event.target.files[0].name);
    this.http.post(HttpService.uploadRoute, formData).subscribe(res => {
      this.images = [...this.images.filter(image => image.id !== event.target.name), { id: event.target.name, url: res }];
    }, err => {
      this.toastr.error("Wystąpił nieoczekiwany błąd...");
    });

  }

  onSubmit(form) {
    const product: Product = {
      _id: uuid(),
      category: form.category,
      date: new Date().toISOString(),
      name: form.name,
      description: form.description,
      promo: true,
      photos: this.images.map(img=>({url: img.url, thumbnail: false})),
      price: form.price,
      sizes: form.sizes.split(",").map(size => ({
        size,
        reserved: false
      }))
    };
    console.log(product);
    product.photos[0].thumbnail = true;
    this.store.dispatch(new fromActions.AddProduct(product));
    this.router.navigate(['admin','list']);
  }
}
