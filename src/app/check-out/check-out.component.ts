import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../_services/shopping-cart.service';
import { AuthService } from '../_services/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css'],
})
export class CheckOutComponent implements OnInit {
  totalPrice = 0;
  shipping: any = {};
  // subscription1: Subscription;
  // authSubscription: Subscription;
  cartData;
  cart: any[] = [];
  taxes = 0;
  deliveryCharges = 0;
  constructor(
    private cartService: ShoppingCartService,
    private authService: AuthService,
    private http: HttpClient,
    private alertify: AlertifyService
  ) {
    this.dataRetrieval();
  }

  ngOnInit(): void {}

  dataRetrieval() {
    this.cartService.getCart().subscribe((x) => {
      this.cartData = x;
      console.log(this.cartData);
      this.getTotalPrice();
    });
  }

  getTotalPrice() {
    this.totalPrice = 0;
    // tslint:disable-next-line: forin
    for (const productId in this.cartData.items) {
      this.totalPrice +=
        this.cartData.items[productId].price *
        this.cartData.items[productId].quantity;
    }
    this.totalPrice = this.totalPrice * 1.05;
    this.taxes = this.totalPrice * 0.05;
    if (this.totalPrice < 300) {
      this.deliveryCharges = 20;
      this.totalPrice += this.deliveryCharges;
    }
    // console.log(this.totalPrice);
  }

  checkOutPressed(data) {
    console.log(data);
    const itemsData = [];
    // tslint:disable-next-line: forin
    for (const id in this.cartData.items) {
      itemsData.push({
        productId: this.cartData.items[id]._id,
        quantity: this.cartData.items[id].quantity,
        price: this.cartData.items[id].price,
      });
    }
    const order = {
      userId: this.authService.decodedToken._id,
      datePlaced: new Date(Date()),
      phoneNumber: data.phoneNumber,
      shipping: {
        addressLine1: data.addressLine1,
        addressLine2: data.addressLine2,
        city: data.city,
        state: data.state,
        country: data.country,
        name: data.name,
      },
      items: itemsData,
      additionalCharges: {
        deliveryCharges: this.deliveryCharges,
        taxes: this.taxes
      },
      totalAmount: this.totalPrice,
      status: 'Order Placed',
      deliveryPerson: 'NA'
    };
    console.log(order);

  }

  sendMail(){
    let data = this.shipping;
    const order = {
      email: this.authService.decodedToken.email,
      datePlaced: new Date(Date()),
      phoneNumber: data.phoneNumber,
      addressLine1: data.addressLine1,
      addressLine2: data.addressLine2,
      city: data.city,
      state: data.state,
      country: data.country,
      name: data.name,
      totalAmount: this.totalPrice
    };
    this.http.post(environment.apiUrl + 'send-invoice', order).subscribe(x => {

    }, error => {
      this.alertify.error('Email Sent');
    });
  }
}
