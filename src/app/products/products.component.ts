import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from '../_services/product.service';
import { ActivatedRoute } from '@angular/router';

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

  constructor(private route: ActivatedRoute, private productService: ProductService) {
    console.log('-------------------------------');
    this.getProducts();
   }

  ngOnInit() {
  }

  getProducts(){
    console.log('prod');
    this.productService.getAll().subscribe((data: any) => {
      this.productListCollection = data;
      this.filter();
    });
  }
  
  filter(){
    this.route.queryParamMap.subscribe(params => {
      this.category = params.get('category');
      this.filteredProducts = (this.category) ?
        this.productListCollection.filter((p: { category: string; }) => p.category.toLowerCase() == this.category.toLowerCase()) :
        this.productListCollection;
      // console.log(this.category);
     //  console.log(this.filteredProducts);
    });
  }



}
