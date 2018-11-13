import { Component, OnInit } from '@angular/core';
import { Order, Product } from 'src/models';
import { Store } from '@ngrx/store';
import { AppState, getOrder, getOrderProductsCount, getOrderProducts } from 'src/store/reducers';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  private products: Observable<Product[]>;
  private productsCount: Observable<number>;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.products = this.store.select(getOrderProducts);
    this.productsCount = this.store.select(getOrderProductsCount);
  }

}
