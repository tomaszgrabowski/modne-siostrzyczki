import { Component, OnInit } from "@angular/core";
import { Product } from "src/models";
import * as fromReducers from "src/store/reducers";
import * as fromActions from "src/store/actions";
import { Store } from "@ngrx/store";
import { HttpService } from "src/app/services/httpService";
import { faImages } from "@fortawesome/free-solid-svg-icons";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-product-add",
  templateUrl: "./product-add.component.html",
  styleUrls: ["./product-add.component.css"]
})
export class ProductAddComponent implements OnInit {
  private placeholder: string = "https://via.placeholder.com/150";
  private images: any[] = [];

  constructor(
    private store: Store<fromReducers.AppState>,
    private http: HttpService,
    private toastr: ToastrService,
    ) { }

  ngOnInit() { }

  onImgChange(event) {
    const formData = new FormData();
    formData.append("upload", event.target.files[0], event.target.files[0].name);
    this.http.post(HttpService.uploadRoute, formData).subscribe(res => {
      this.images = [...this.images.filter(image => image.id !== event.target.name), { id: event.target.name, url: res }];
      console.log("arr changed", this.images);
    }, err => {
      this.toastr.error("Wystąpił nieoczekiwany błąd...");
    });

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
      photos: this.images.map(img=>({url: img.url, thumbnail: false})),
      price: form.price,
      sizes: form.sizes.split(",").map(size => ({
        size,
        reserved: false
      }))
    };
    product.photos[0].thumbnail = true;
    this.store.dispatch(new fromActions.AddProduct(product));
    // move to admin product list
  }
}
