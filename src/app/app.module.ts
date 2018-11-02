import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { appReducer } from "src/store/reducers";
import { ProductsListComponent } from "./components/products-list/products-list.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ProductComponent } from "./components/product/product.component";
import { ProductThumbnailDirective } from "./directives/product-thumbnail.directive";
import { RouterModule, Routes } from "@angular/router";
import { ContactComponent } from "./components/contact/contact.component";
import { NavMenuComponent } from "./components/nav-menu/nav-menu.component";
import { CartComponent } from './components/cart/cart.component';
import { OrderComponent } from './components/order/order.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';

const routes: Routes = [
  { path: "", component: ProductsListComponent, pathMatch: "full" },
  { path: "product/:id", component: ProductDetailsComponent },
  { path: "contact", component: ContactComponent },
  { path: "cart", component: CartComponent },
  { path: "checkout", component: OrderComponent },
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
    ProductDetailsComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot(appReducer),
    StoreDevtoolsModule.instrument({
      maxAge: 5
    }),
    NgbModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
