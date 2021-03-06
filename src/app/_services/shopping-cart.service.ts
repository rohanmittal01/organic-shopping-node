import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  baseUrl = environment.apiUrl + 'shopping-cart/';
  cart: any;
  constructor(private http: HttpClient, private authService: AuthService) {}

  availableCartData: any;
  getCart() {
    return this.http.get(this.baseUrl + this.authService.decodedToken._id);
  }

  addToCart(product) {
    this.updateItemQuantity(product, 1);
  }

  removeFromCart(product) {
    this.updateItemQuantity(product, -1);
  }

  private updateItemQuantity(item, change) {
    // tslint:disable-next-line: forin
    for (let product in this.cart.items) {
      if (this.cart.items[product]._id == item._id) {
        this.cart.items[product].quantity += change;
        this.cart.items[product].totalPrice =
          this.cart.items[product].quantity * this.cart.items[product].price;
        // console.log(this.cart.items[product]);
        if (this.cart.items[product].quantity == 0) {
          this.cart.items.splice(product, 1);
        }
        return this.http
          .patch(this.baseUrl + this.authService.decodedToken._id, this.cart)
          .subscribe((x) => {
            this.cart = x;
          });
      }
    }
  }

  // Called on clicking Add To Cart
  addFromProduct(product) {
    this.cart.items.push(product);
    // console.log('cart');
    // console.log(this.cart);
    return this.http.patch(
      this.baseUrl + this.authService.decodedToken._id,
      this.cart
    );
  }

  createShoppingCart(product) {
    return this.http.post(this.baseUrl, product);
  }

  clearCart() {
    return this.http.delete(this.baseUrl + this.authService.decodedToken._id);
  }

  // tslint:disable-next-line: ban-types
  cartCount(): any{

    let count = 0;
    // console.log(this.cart);
    this.getCart().subscribe(x => {
      // console.log('data');
      // console.log(x);
      this.cart = x;
      let shoppingCartItemCount = 0;
      // console.log(this.cart);
      for (const productId in this.cart.items){
        shoppingCartItemCount += this.cart.items[productId].quantity;
      }
      // console.log('count - ' + shoppingCartItemCount);
      count = shoppingCartItemCount;
    }, error => {
      // console.log('An error occurred');
      count = 0;
    });

    return count;
  }
}
