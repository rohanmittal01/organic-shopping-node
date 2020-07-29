import { Component } from '@angular/core';
import { AuthService } from './_services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ShoppingCartService } from './_services/shopping-cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  jwtHelper = new JwtHelperService();
  constructor(private authService: AuthService, private cartService: ShoppingCartService){}

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit(): void {
    
    if (this.authService.loggedIn()){
      const token = localStorage.getItem('token');
      this.authService.decodedToken = this.jwtHelper.decodeToken(token);
      console.log(this.jwtHelper.decodeToken(token));
      this.cartService.getCart().subscribe(x => {
        if(x){
        this.cartService.cart = x;
        }else{
          this.cartService.cart = [];
        }
        // console.log(this.cartService.cart);
      }, error => {});
      
      // this.authService.logged = true;
    }
  }

}
