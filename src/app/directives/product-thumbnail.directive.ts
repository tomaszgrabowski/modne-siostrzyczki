import { Directive, Input, OnInit, HostBinding } from "@angular/core";
import { ProductImage } from "src/models";
import { ConstantsService } from "../services/constants.service";

@Directive({
  selector: "[app-product-thumbnail]"
})
export class ProductThumbnailDirective implements OnInit {
  @Input()
  items: ProductImage[];

  @HostBinding("attr.src")
  src;

  constructor(
    private constants: ConstantsService
  ) {}

  ngOnInit(): void {
    if (this.items) {
      const prefix =  this.constants.DEV_MODE ? `http://localhost:1334/photos/` : `/photos/`;
      const image = this.items.find(item => item.thumbnail).url || this.items[0].url;
      this.src = `${prefix}${image}`;
    }
  }
}
