import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../_services/shopping-cart.service';

@Component({
  selector: 'check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {

  totalPrice = 0;
  shipping: any = {};
  // subscription1: Subscription;
  // authSubscription: Subscription;
  cartData;
  cart: any[] = [];
  constructor(private cartService: ShoppingCartService) {
    this.dataRetrieval();
  }

  ngOnInit(): void {
  }

  dataRetrieval(){
    this.cartService.getCart().subscribe(x => {
      this.cartData = x;
    
      this.getTotalPrice();
    });
  }

  getTotalPrice(){
    this.totalPrice = 0;
    // tslint:disable-next-line: forin
    for (const productId in this.cartData.items) {
      this.totalPrice += (this.cartData.items[productId].price * this.cartData.items[productId].quantity);
    }
   // console.log(this.totalPrice);
  }

  checkOutPressed(data){
    console.log(data);
  }



}
