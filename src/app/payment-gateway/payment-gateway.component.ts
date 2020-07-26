import { Component, OnInit } from '@angular/core';
import { OrderService } from '../_services/order.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'payment-gateway',
  templateUrl: './payment-gateway.component.html',
  styleUrls: ['./payment-gateway.component.css']
})
export class PaymentGatewayComponent implements OnInit {

  orderData;
  card;
  constructor(private orderService: OrderService) {
    console.log('datatatata');
    console.log(orderService.orderData);
    this.orderData = orderService.orderData;
   }

  ngOnInit(): void {
  }

}
