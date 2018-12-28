import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ConstantsService } from "./constants.service";

@Injectable({
  providedIn: "root"
})
export class HttpService {

  static usersRoute: string = "/users";
  static productsRoute: string = "/products";
  static ordersRoute: string = "/orders";
  static loginRoute: string = "/login";
  static uploadRoute: string = "/upload";

  private baseUrl: string;

  constructor(private http: HttpClient, private constants: ConstantsService) {
    this.baseUrl = this.constants.API_URL;
  }

  get(url: string, headers?: {}): Observable<Object> {
    return this.http.get(this.baseUrl + url, headers);
  }

  post(url: string, obj: any, headers?: {}): Observable<Object> {
    return this.http.post(this.baseUrl + url, obj, headers);
  }

  delete(url: string, obj: any, headers?: {}): Observable<Object> {
    return this.http.delete(this.baseUrl + url + '/' + obj._id, headers);
  }
}
