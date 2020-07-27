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
  card: any = {};
  monthArray: any = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  // tslint:disable-next-line: ban-types
  // monthArray: any = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  yearArray: any = ['2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030'];
  constructor(private orderService: OrderService) {
    console.log('datatatata');
    console.log(orderService.orderData);
    this.orderData = orderService.orderData;
    // console.log(this.month[2]);
    // console.log(this.month);
   }

   save(){
     console.log(this.card);
   }

  ngOnInit(): void {
  }

}
