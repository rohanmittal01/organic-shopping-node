import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../_services/shopping-cart.service';
import { AuthService } from '../_services/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AlertifyService } from '../_services/alertify.service';
import { PasswordService } from '../_services/password.service';
import { Router } from '@angular/router';
import { OrderService } from '../_services/order.service';

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
  passwordSent = false;
  codeGenerated = '';
  otpValue = '';

  otpModel;
  constructor(
    private cartService: ShoppingCartService,
    private authService: AuthService,
    private http: HttpClient,
    private alertify: AlertifyService,
    private passwordService: PasswordService,
    private route: Router,
    private orderService: OrderService
  ) {
    this.dataRetrieval();
  }

  ngOnInit(): void {}

  dataRetrieval() {
    // this.cartService.getCart().subscribe((x) => {
    //   this.cartData = x;
    //   console.log(this.cartData);
    //   this.getTotalPrice();
    // });
    this.cartData = this.cartService.availableCartData;
    console.log('availlllllll');
    console.log(this.cartData);
    this.getTotalPrice();
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

  randomString() {
    const chars =
      '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
    const stringLength = 10;
    let randomstring = '';
    for (let i = 0; i < stringLength; i++) {
      const rnum = Math.floor(Math.random() * chars.length);
      randomstring += chars.substring(rnum, rnum + 1);
    }
    this.codeGenerated = randomstring;
    return 0;
  }

  addButtonPressed(){
    this.passwordSent = false;
    console.log(this.shipping);
    this.randomString();
    console.log(this.codeGenerated);
    this.otpModel = {
      email: this.authService.decodedToken.email,
      name: this.shipping.name,
      code: this.codeGenerated
    };
    this.sendOtp(this.otpModel);
  }

  sendOtp(model){
      this.passwordService.orderOtp(this.otpModel).subscribe(x => {
        this.passwordSent = true;
        console.log(x);
      }, error => {
        console.log(error);
        this.alertify.success('OTP Sent');
        this.passwordSent = true;
      });
  }

  otpSubmitPressed(){
    // tslint:disable-next-line: triple-equals
    if (this.codeGenerated == this.otpValue){
      this.checkOutPressed();
    }else{
      this.alertify.error('Incorrect OTP!');
    }
  }

  checkOutPressed() {
    const data = this.shipping;
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
      totalAmount: this.totalPrice.toFixed(2),
      status: 'Order Placed',
      deliveryPerson: 'NA'
    };
    this.orderService.orderData = order;
    this.route.navigate(['/payment-gateway']);
    console.log(order);

  }

  sendMail(){
    const data = this.shipping;
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
