import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class HttpService {
  private baseUrl: string = "http://localhost:3000/";

  constructor(private http: HttpClient) {}

  get(url: string): Observable<Object> {
    return this.http.get(this.baseUrl + url);
  }

  post(url: string, obj: any): Observable<Object> {
    return this.http.post(this.baseUrl + url, obj);
  }
}
