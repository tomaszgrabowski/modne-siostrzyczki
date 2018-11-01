import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { appReducer } from "src/store/reducers";
import { ProductsListComponent } from "./components/products-list/products-list.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ProductComponent } from './components/product/product.component';

@NgModule({
  declarations: [AppComponent, ProductsListComponent, ProductComponent],
  imports: [
    BrowserModule,
    StoreModule.forRoot(appReducer),
    StoreDevtoolsModule.instrument({
      maxAge: 5
    }),
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
