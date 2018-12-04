import { Directive, Input, OnInit, HostBinding } from "@angular/core";
import { ProductImage } from "src/models";
import { DomainResolverService } from "../services/domain-resolver.service";

@Directive({
  selector: "[app-product-thumbnail]"
})
export class ProductThumbnailDirective implements OnInit {
  @Input()
  items: ProductImage[];

  @HostBinding("attr.src")
  src;

  constructor(
    private domainResolver: DomainResolverService
  ) {}

  ngOnInit(): void {
    if (this.items) {
      const image = this.items.find(item => item.thumbnail).url || this.items[0].url;
      this.src = this.domainResolver.getResourceUrl(image);
    }
  }
}
