import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  baseUrl = environment.apiUrl + 'shopping-cart/';
  cart: any;
  constructor(private http: HttpClient, private authService: AuthService) {
  }

  getCart(){
     return this.http.get(this.baseUrl + this.authService.decodedToken._id);
   }

   // Called on clicking Add To Cart
   addFromShoppingCart(product){
    this.cart.items.push(product);
    console.log('cart');
    console.log(this.cart);
    return this.http.patch(this.baseUrl + this.authService.decodedToken._id, this.cart);
   }

   

  clearCart(){
    return this.http.delete(this.baseUrl + this.authService.decodedToken._id);
  }
}
