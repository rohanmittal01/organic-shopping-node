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
  availableData;
  shoppingCartItemCount;
  totalPrice = 0;
  dataRetrieved = false;
  availableCart: any = [];
  unavailableCart: any;
  constructor(private cartService: ShoppingCartService, private alertify: AlertifyService, private productService: ProductService) {
    console.log('count ' + this.shoppingCartItemCount);
    this.dataRetrieval();
   }

  ngOnInit(): void {
  }



  dataRetrieval(){
    this.productService.getAll().subscribe(x => {
      this.availableData = x;
      this.cartService.getCart().subscribe(x => {
        this.cartData = x;
        this.dataRetrieved = true;
        console.log(this.cartData);
        console.log(this.availableData);
        this.filterData();
        this.getShoppingCartItemCount();
        this.getTotalPrice();
      }, error => {
        this.dataRetrieved = true;
      });
    });
  }

  filterData(){
    const available = JSON.parse(JSON.stringify(this.cartData));
    available.items = [];
    const unavailable = JSON.parse(JSON.stringify(this.cartData));
    unavailable.items = [];
    console.log('--------------------------------------');
  
    console.log(available);
    console.log(unavailable);
    console.log('during filtering');
    // tslint:disable-next-line: forin
    for (const cartItemId in this.cartData.items){
      console.log(this.cartData.items[cartItemId]);
      let found = 0;
      let product;
      for (const productId in this.availableData){
        if (this.cartData.items[cartItemId]._id == this.availableData[productId]._id){
          found = 1;
          product = this.availableData[productId];
          break;
        }
      }
      if (found == 1){
        product.quantity = this.cartData.items[cartItemId].quantity;
        available.items.push(product);
        console.log('found');
        
      }else{
        unavailable.items.push(this.cartData.items[cartItemId]);
        console.log('not found');
      }
      // console.log(unavailable);
      // console.log(available);
    }
    console.log('-----------------------------------------------------------------');
    console.log('After filtering');
    console.log(available);
    console.log(unavailable);
    this.availableCart = available;
    this.cartService.availableCartData = this.availableCart;
    if(unavailable.items.length != 0){
    this.unavailableCart = unavailable;
    }
    console.log(this.unavailableCart);
  
  }

  getShoppingCartItemCount(){
    this.shoppingCartItemCount = 0;
    // tslint:disable-next-line: forin
    for (const productId in this.availableCart.items){
      this.shoppingCartItemCount += this.availableCart.items[productId].quantity;
    }
    console.log(this.shoppingCartItemCount);
  }

  getTotalPrice(){
    this.totalPrice = 0;
    // tslint:disable-next-line: forin
    for (const productId in this.availableCart.items) {
      this.totalPrice += (this.availableCart.items[productId].price * this.availableCart.items[productId].quantity);
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
    for (const product in this.availableCart.items){
      // tslint:disable-next-line: triple-equals
      if (this.availableCart.items[product]._id == cartData._id){
        this.availableCart.items[product].quantity += change;
        // tslint:disable-next-line: triple-equals
        if (this.availableCart.items[product].quantity == 0) {
          this.availableCart.items.splice(product, 1);
        }
        this.getShoppingCartItemCount();
        this.getTotalPrice();
        return;
      }
     }
  }


  clearCart(){
    this.cartService.clearCart().subscribe(x => {
      this.shoppingCartItemCount = 0;
      this.alertify.success('Cart cleared successfully!');
      window.location.reload();
    }, error => {
      this.alertify.error('Cart could not be cleared!');
    });
  }

}
