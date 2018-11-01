import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input() product: Product
  constructor() { }

  ngOnInit() {

  }

  navigateToProduct(product: Product):void{
    //this.router.navigate
  }

}
