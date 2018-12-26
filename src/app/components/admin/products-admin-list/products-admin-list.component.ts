import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromReducers from "src/store/reducers";
import { ToastrService } from "ngx-toastr";
import { Product } from 'src/models';
import { SafeResourceUrl } from '@angular/platform-browser';
import { DomainResolverService } from "src/app/services/domain-resolver.service";

@Component({
  selector: 'app-products-admin-list',
  templateUrl: './products-admin-list.component.html',
  styleUrls: ['./products-admin-list.component.css']
})
export class ProductsAdminListComponent implements OnInit {
  products: Product[];

  constructor(
    private store: Store<fromReducers.AppState>,
    private toastr: ToastrService,
    private domainResolver: DomainResolverService) { }

  ngOnInit() {
    this.store.select(fromReducers.getProducts).subscribe(products => {
      this.products = products;
    });

  }

  getThumbnail(product:Product): SafeResourceUrl{
    const image = product.photos.find(image=>image.thumbnail);
    return this.domainResolver.getResourceUrl(image.url);
  }
}
