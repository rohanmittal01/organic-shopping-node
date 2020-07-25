import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../_services/shopping-cart.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'shopping-cart-summary',
  templateUrl: './shopping-cart-summary.component.html',
  styleUrls: ['./shopping-cart-summary.component.css']
})
export class ShoppingCartSummaryComponent implements OnInit {

  cartData;
  shoppingCartItemCount = 0;
  totalPrice = 0;
  taxes = 0;
  deliveryCharges = 0;
  constructor(private cartService: ShoppingCartService, private alertify: AlertifyService) {
    this.dataRetrieval();
  }

  ngOnInit(): void {
  }


  async dataRetrieval(){
    await this.cartService.getCart().subscribe(x => {
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

    this.totalPrice = this.totalPrice * 1.05;
    this.taxes = this.totalPrice * 0.05;
    if (this.totalPrice < 300){
        this.deliveryCharges = 20;
        this.totalPrice += this.deliveryCharges;
      }
   // console.log(this.totalPrice);
  }

}
