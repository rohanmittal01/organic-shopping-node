import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/_services/order.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { DeliveryPersonService } from 'src/app/_services/delivery-person.service';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-more-order-details',
  templateUrl: './more-order-details.component.html',
  styleUrls: ['./more-order-details.component.css']
})
export class MoreOrderDetailsComponent implements OnInit {
  id;
  orderDetails: any = {};
  products = [];
  deliveryPersons;
  date;
  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
    private productService: ProductService,
    private deliveryService: DeliveryPersonService,
    private alertify: AlertifyService
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getOrderInfo();
    console.log(this.products);
  }

  getOrderInfo() {
    if (this.id) {
      this.orderService.getOrderDetails(this.id).subscribe((p) => {
        console.log(p);
        this.orderDetails = p;
        this.date = new Date(this.orderDetails.datePlaced).toLocaleString();
        console.log(this.orderDetails.items);
        this.getProductDetails();
      });
    }
  }

  getProductDetails() {
    // tslint:disable-next-line: forin
    for (const id in this.orderDetails.items) {
      // console.log(cart);
      // tslint:disable-next-line: triple-equals
      this.productService.get(this.orderDetails.items[id].productId).subscribe((x:any) => {
        x.quantity = this.orderDetails.items[id].quantity;
        this.products.push(x);
      });
      console.log(this.products);
    }
  }


  ngOnInit(): void {
  }
}
