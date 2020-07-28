import { Component, OnInit } from '@angular/core';
import { OrderService } from '../_services/order.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'payment-gateway',
  templateUrl: './payment-gateway.component.html',
  styleUrls: ['./payment-gateway.component.css'],
})
export class PaymentGatewayComponent implements OnInit {
  orderData;
  card: any = {};
  monthArray: any = [
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
  ];
  // tslint:disable-next-line: ban-types
  // monthArray: any = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  // yearArray: any = ['2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030'];
  yearArray: any = [
    2020,
    2021,
    2022,
    2023,
    2024,
    2025,
    2026,
    2027,
    2028,
    2029,
    2030,
    2031,
  ];
  cardDigit;
  cardError = false;
  constructor(private orderService: OrderService) {
    console.log('datatatata');
    console.log(orderService.orderData);
    this.orderData = orderService.orderData;
    // console.log(this.month[2]);
    // console.log(this.month);
  }

  save() {
    this.cardError = false;
    let c = String(this.card.number);
    console.log(c.length);
    if (this.cardDigit == 3) {
      if (c.length == 15) {
        this.cardError = false;
        this.proceed();
      } else {
        this.cardError = true;
      }
    } else if (this.cardDigit == 4) {
      if (c.length == 13 || c.length == 16 || c.length == 19) {
        this.cardError = false;
        this.secondCheck();
      } else {
        this.cardError = true;
      }
    } else if (this.cardDigit == 5) {
      if (c.length == 16) {
        this.cardError = false;
        this.secondCheck();
      } else {
        this.cardError = true;
      }
    } else if (this.cardDigit == 6) {
      if (c.length == 16 || c.length == 19) {
        this.cardError = false;
        this.secondCheck();
      } else {
        this.cardError = true;
      }
    } else {
      this.cardError = true;
    }
  }

  secondCheck() {
    let c = this.card.number;
    const lastDigit = c % 10;
    let cardSum = 0;
    c = Math.floor(c / 10);
    const reversedNum = c.toString().split('').reverse().map(Number);

    // tslint:disable-next-line: forin
    for (let num in reversedNum) {
      // tslint:disable-next-line: radix
      if (parseInt(num) % 2 == 0){
        // console.log(reversedNum[num]);
        reversedNum[num] = reversedNum[num] * 2;
        if (reversedNum[num] > 9){
          reversedNum[num] -= 9;
        }
      }
      cardSum += reversedNum[num];
      // console.log(num);
    }
    console.log(cardSum);
    if (cardSum % 10 == lastDigit){
      console.log('verified');
      this.cardError = false;
    }else{
      this.cardError = true;
    }
    console.log(reversedNum);
  }

  proceed() {
    console.log(this.card);
  }


  validate() {
    console.log(this.card.number);
    let num = this.card.number;
    while (num > 10) {
      // tslint:disable-next-line: radix
      num = Math.floor(num / 10);
    }
    console.log(num);
    this.cardDigit = num;
  }
  ngOnInit(): void {}
}
