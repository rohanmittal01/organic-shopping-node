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
      this.getShoppingCartItemCount();
      this.getTotalPrice();
    });
  }

  getShoppingCartItemCount(){
    this.shoppingCartItemCount = 0;
    // tslint:disable-next-line: forin
    for (const productId in this.cartData.items){
      this.shoppingCartItemCount += this.cartData.items[productId].quantity;
    }
    console.log(this.shoppingCartItemCount);
  }

  getTotalPrice(){
    this.totalPrice = 0;
    // tslint:disable-next-line: forin
    for (const productId in this.cartData.items) {
      this.totalPrice += (this.cartData.items[productId].price * this.cartData.items[productId].quantity);
    }
   // console.log(this.totalPrice);
  }

  addToCart(cartData){
    this.cartService.addToCart(cartData);
    this.updateQuantity(cartData, 1);
   
    // console.log(this.cartData.items.push(cartData));
    // console.log(this.cartData);
  }

  removeFromCart(cartData){
    this.cartService.removeFromCart(cartData);
    this.updateQuantity(cartData, -1);
  }

  updateQuantity(cartData, change){
    for(let product in this.cartData.items){
      if(this.cartData.items[product]._id == cartData._id){
        this.cartData.items[product].quantity += change;
        this.getTotalPrice();
        return;
      }
     }
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
