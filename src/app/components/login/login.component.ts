import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import * as fromReducers from "src/store/reducers";
import * as fromActions from "src/store/actions";
import { User } from "src/models";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  private wrongPassword: boolean = false;

  private counter: number = 0;

  constructor(
    private router: Router,
    private store: Store<fromReducers.AppState>
  ) {}

  ngOnInit() {
    this.store.select(fromReducers.isLoggedIn).subscribe(user => {
      if (user && this.counter > 0) {
        this.router.navigate(["/"]);
      } else {
        this.wrongPassword = true;
      }
    });
  }

  onSubmit(login: string, password: string): void {
    if (this.validateLoginTries()) {
      const user: User = {
        email: login,
        password: password
      };
      this.store.dispatch(new fromActions.LoginUser(user));
    } else {
      this.router.navigate(["/"]);
    }
  }

  onRemindMe(login: string) {
    console.log("Password reset procedure");
    //todo: navigate to password reset
  }

  private validateLoginTries(): boolean {
    this.counter++;
    return this.counter === 3 ? false : true;
  }
}
