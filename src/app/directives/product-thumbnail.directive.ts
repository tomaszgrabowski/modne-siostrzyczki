import { Directive, Input, OnInit, HostBinding } from "@angular/core";
import { ProductImage } from "src/models";

@Directive({
  selector: "[app-product-thumbnail]"
})
export class ProductThumbnailDirective implements OnInit {
  @Input()
  items: ProductImage[];
  
  @HostBinding("attr.src")
  src;

  constructor() {}

  ngOnInit(): void {
    if (this.items) {
      this.src = this.items.find(item => item.thumbnail).url || this.items[0];
    }
  }
}
