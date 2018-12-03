import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { appReducer } from "src/store/reducers";
import { ProductsListComponent } from "./components/products-list/products-list.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ProductComponent } from "./components/product/product.component";
import { ProductThumbnailDirective } from "./directives/product-thumbnail.directive";
import { RouterModule, Routes } from "@angular/router";
import { ContactComponent } from "./components/contact/contact.component";
import { NavMenuComponent } from "./components/nav-menu/nav-menu.component";
import { CartComponent } from "./components/cart/cart.component";
import { OrderComponent } from "./components/order/order.component";
import { ProductDetailsComponent } from "./components/product-details/product-details.component";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";

import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { ProductsEffects } from "src/store/effects/products.effects";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { OrderEffects } from "src/store/effects/order.effects";
import { LoginComponent } from "./components/login/login.component";
import { UserEffects } from "src/store/effects/user.effects";
import { RegisterComponent } from './components/register/register.component';
import { FormsModule } from "@angular/forms";
import { PasswordEqualDirective } from './directives/password-equal.directive';
import { ZipNumberDirective } from './directives/zip-number.directive';
import { ProductAddComponent } from './components/admin/product-add/product-add.component';
import { SizesFiedDirective } from './directives/sizes-fied.directive';
import { AuthInterceptorService } from "./services/auth-interceptor.service";
import { LoggedinGuardService } from "./services/LoggedinGuardService";

const routes: Routes = [
  { path: "", component: ProductsListComponent, pathMatch: "full" },
  { path: "product/:id", component: ProductDetailsComponent },
  { path: "contact", component: ContactComponent },
  { path: "cart", component: CartComponent },
  { path: "checkout", component: OrderComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "admin/add-product", component: ProductAddComponent, canActivate: [ LoggedinGuardService ] },
  { path: "**", component: ProductsListComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ProductsListComponent,
    ProductComponent,
    ProductThumbnailDirective,
    ContactComponent,
    NavMenuComponent,
    CartComponent,
    OrderComponent,
    ProductDetailsComponent,
    LoginComponent,
    RegisterComponent,
    PasswordEqualDirective,
    ZipNumberDirective,
    ProductAddComponent,
    SizesFiedDirective
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot(appReducer),
    StoreDevtoolsModule.instrument({
      maxAge: 5
    }),
    NgbModule,
    RouterModule.forRoot(routes),
    FontAwesomeModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: "toast-bottom-right",
      preventDuplicates: true,
      progressAnimation: "decreasing",
      progressBar: true
    }),
    EffectsModule.forRoot([ProductsEffects, OrderEffects, UserEffects]),
    HttpClientModule,
    FormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
