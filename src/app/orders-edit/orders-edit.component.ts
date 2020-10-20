import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { DeliveryPersonService } from '../_services/delivery-person.service';
import { OrderService } from '../_services/order.service';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-orders-edit',
  templateUrl: './orders-edit.component.html',
  styleUrls: ['./orders-edit.component.css']
})
export class OrdersEditComponent implements OnInit {

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
    this.getDeliveryPerson();
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
    console.log('hi');
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

  getDeliveryPerson(){
    console.log('hi');
    this.deliveryService.getAvailable().subscribe(x => {
      this.deliveryPersons = x;
      console.log('hi');
      console.log(this.deliveryPersons);
    });
  }

  update(){
    console.log(this.orderDetails.status);
    console.log(this.orderDetails.deliveryPerson); 
    this.orderService.updateOrder({id: this.id, body: this.orderDetails}).subscribe(x => {
      this.alertify.success('Order details updated successfully!');
    }, error => {
      this.alertify.error('Order details could not be updated!');
    });
  }
  ngOnInit(): void {}

}
