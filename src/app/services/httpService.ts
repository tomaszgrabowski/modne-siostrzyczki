import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ConstantsService } from "./constants.service";

@Injectable({
  providedIn: "root"
})
export class HttpService {

  static usersRoute: string = "users";
  static productsRoute: string = "products";
  static ordersRoute: string = "orders";
  static loginRoute: string = "login";

  private baseUrl: string;

  constructor(private http: HttpClient, private constants: ConstantsService) {
    this.baseUrl = this.constants.API_URL;
  }

  get(url: string): Observable<Object> {
    return this.http.get(this.baseUrl + url);
  }

  post(url: string, obj: any): Observable<Object> {
    return this.http.post(this.baseUrl + url, obj);
  }
}
