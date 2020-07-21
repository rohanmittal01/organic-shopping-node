import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  productListCollection: any[];
  subscribe1: Subscription;
  category: string;
  filteredProducts: any = [];
  cart: any;
  cartSubscription: Subscription;

  constructor(private productService: ProductService) {
    console.log('-------------------------------');
    this.getProducts();
   }

  ngOnInit() {
  }

  getProducts(){
    console.log('prod');
    this.productService.getAll().subscribe(data => {
      this.filteredProducts = data;
      
    });
  }
  


}
