import { Injectable } from "@angular/core";
import { ConstantsService } from "./constants.service";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";

@Injectable({
  providedIn: "root"
})
export class DomainResolverService {
  constructor(
    private constants: ConstantsService,
    private sanitizer: DomSanitizer
  ) {}

  public getDomain(): string {
    return this.constants.DEV_MODE ? this.constants.API_URL : ``;
  }

  public getResourceUrl(resourceName: string): SafeResourceUrl {
        return this.sanitizer.bypassSecurityTrustResourceUrl(`${this.getDomain()}/resources/${resourceName}`);
  }
}
