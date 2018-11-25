import { Component, OnInit } from "@angular/core";
import { AppState } from "src/store/reducers";
import { Store } from "@ngrx/store";
import * as fromActions from "src/store/actions";
import { User } from "src/models";
import { v4 as uuid} from 'uuid';
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit() {}

  onSubmit(form: any): void {
    console.log(form);
    var user: User = {
      id: uuid(),
      email: form.email,
      name: form.name,
      password: form.password, //todo: hash!!!
      phone: form.phone,
      surname: form.surname,
      address: {
        city: form.city,
        country: form.country,
        number: form. number,
        street: form.street,
        zip: form.zip
      }
    };
    this.store.dispatch(new fromActions.RegisterUser(user));
    this.router.navigate(["/"]);  //welcome page maybe?

  }
}
