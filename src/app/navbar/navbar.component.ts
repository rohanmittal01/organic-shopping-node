import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ShoppingCartService } from '../_services/shopping-cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  jwtHelper: JwtHelperService;
  // tslint:disable-next-line: ban-types
  loggedIn: Boolean = false;
  isAdmin = false;
  name;
  cartData;
  shoppingCartItemCount = 0;
  constructor(public authService: AuthService, private cartService: ShoppingCartService) {
    this.loggedIn = this.authService.loggedIn();
    this.cartData = this.cartService.cart;
    // this.isAdmin = authService.decodedToken.isAdmin

  }

  ngOnInit(){
    // let token = localStorage.getItem('token');
    // this.authService.decodedToken = this.jwtHelper.decodeToken(token);
    // console.log(this.jwtHelper.decodeToken(token));
    //   // this.authService.logged = true;
    // this.name = this.authService.decodedToken.name;
    this.dataRetrieval();
  }

  dataRetrieval(){
    this.cartService.getCart().subscribe(x => {
      this.cartData = x;
      this.getShoppingCartItemCount();
    });
  }

  getShoppingCartItemCount(){
    this.shoppingCartItemCount = 0;
    // tslint:disable-next-line: forin
    for (const productId in this.cartData.items){
      this.shoppingCartItemCount += this.cartData.items[productId].quantity;
    }
    // console.log(this.shoppingCartItemCount);
  }

  logout(){
    this.authService.logout();
  }


}
