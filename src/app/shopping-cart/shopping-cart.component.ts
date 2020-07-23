import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../_services/shopping-cart.service';
import { ProductService } from '../_services/product.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  cartData;
  shoppingCartItemCount = 0;
  totalPrice = 0;
  constructor(private cartService: ShoppingCartService, private productService: ProductService, private alertify: AlertifyService) {

    this.dataRetrieval();
   
   }

  ngOnInit(): void {
  }



  dataRetrieval(){
    this.cartService.getCart().subscribe(x => {
      this.cartData = x;
      console.log('cart');
      console.log(this.cartData);
      this.getShoppingCartItemCount();
      this.getTotalPrice();
    });
  }

  getShoppingCartItemCount(){
    this.shoppingCartItemCount = 0;
    // tslint:disable-next-line: forin
    for (const productId in this.cartData.items){
      console.log(this.cartData.items[productId].quantity);
      this.shoppingCartItemCount += this.cartData.items[productId].quantity;
    }
    console.log(this.shoppingCartItemCount);
  }

  getTotalPrice(){
    this.totalPrice = 0;
    // tslint:disable-next-line: forin
    for (const productId in this.cartData.items) {
      console.log(this.cartData.items[productId]);
      this.totalPrice += (this.cartData.items[productId].price * this.cartData.items[productId].quantity);
    }
   // console.log(this.totalPrice);
  }

  addToCart(cartData){

  }

  removeFromCart(cartData){

  }


  clearCart(){
    this.cartService.clearCart().subscribe(x => {
      this.shoppingCartItemCount = 0;
      this.alertify.success('Cart cleared successfully!');
    }, error => {
      this.alertify.error('Cart could not be cleared!');
    });
  }

}
