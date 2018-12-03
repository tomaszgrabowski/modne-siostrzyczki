import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler
} from "@angular/common/http";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import * as fromReducers from "src/store/reducers";

@Injectable({
  providedIn: "root"
})
export class AuthInterceptorService implements HttpInterceptor {
  private authToken: string = "";

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    // Get the auth token from the service.
    this.store.select(fromReducers.getUser).subscribe(user => {
      if (user) {
        this.authToken = user.token;
      }
    });

    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    const authReq = req.clone({
      headers: req.headers.set("Authorization", `Bearer ${this.authToken}`)
    });

    // send cloned request with header to the next handler.
    return next.handle(authReq);
  }

  constructor(private store: Store<fromReducers.AppState>) {}
}
