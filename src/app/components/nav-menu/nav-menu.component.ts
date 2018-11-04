import { Component, OnInit } from '@angular/core';
import { faHome, faEnvelope, faShoppingCart, faMoneyCheckAlt } from '@fortawesome/free-solid-svg-icons';
import { AppState, getOrderProducts } from 'src/store/reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {

  private activeRouteBorderStyle: string[] = ['active-route'];
  private faHome = faHome;
  private faEvenlope = faEnvelope;
  private faShoppingCart = faShoppingCart;
  private faMoneyCheckAlt = faMoneyCheckAlt;
  private productsInCart: number = 0;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.select(getOrderProducts).subscribe( count => {
      console.log('aaa',count);
    });
  }

}
