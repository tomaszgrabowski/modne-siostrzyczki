import { Component, OnInit } from '@angular/core';
import { faHome, faEnvelope, faShoppingCart, faMoneyCheckAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {

  activeRouteBorderStyle: string[] = ['active-route'];
  faHome = faHome;
  faEvenlope = faEnvelope;
  faShoppingCart = faShoppingCart;
  faMoneyCheckAlt = faMoneyCheckAlt;

  constructor() { }

  ngOnInit() {
  }

}
