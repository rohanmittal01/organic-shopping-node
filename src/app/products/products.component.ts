import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from '../_services/product.service';
import { ActivatedRoute } from '@angular/router';
import { ShoppingCartService } from '../_services/shopping-cart.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  productListCollection: any[];
  subscribe1: Subscription;
  category: string;
  filteredProducts: any = [];
  cart: any;
  cartSubscription: Subscription;
  availability;
  noProducts = false;
  minRange;
  maxRange;
  range;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: ShoppingCartService
  ) {
    // console.log('-------------------------------');
    this.getCart();
    this.getProducts();
  }

  ngOnInit() {}

  getCart() {
    this.cartService.getCart().subscribe((data: any) => {
      this.cart = data;
    }, error => {});
  }

  getProducts() {
    // console.log('prod');
    this.productService.getAllProducts().subscribe((data: any) => {
      this.productListCollection = data;
      this.filter();
    });
  }

  filter() {
    // console.log(this.productListCollection);
    this.route.queryParamMap.subscribe((params) => {
      this.availability = params.get('availability');
      this.category = params.get('category');
      this.minRange = Number(params.get('minim'));
      this.maxRange = Number(params.get('maxim'));
      if (this.availability) {
        this.productService.getAll().subscribe((x) => {
          this.filteredProducts = x;
        }, error => {

        });
      } else if (this.category) {
        this.filteredProducts = this.productListCollection.filter(
          (p: { category: string }) =>
            p.category.toLowerCase() == this.category.toLowerCase()
        );
      } else if (this.minRange>=0 && this.maxRange>0){
        let arr = [];
        for(const pdt in this.productListCollection){
          if(this.productListCollection[pdt].price >= this.minRange && this.productListCollection[pdt].price <= this.maxRange){
            arr.push(this.productListCollection[pdt]);
          }
        }
        this.filteredProducts = arr;
      } else {
        this.filteredProducts = this.productListCollection;
      }
      // tslint:disable-next-line: triple-equals
      // console.log(this.filteredProducts);
      // tslint:disable-next-line: triple-equals
      if (this.filteredProducts.length == 0) {
        console.log('empty af');
        // tslint:disable-next-line: no-unused-expression
        // tslint:disable-next-line: triple-equals
        this.noProducts == true;
      }
      // console.log(this.category);
      // console.log(this.filteredProducts);
      // console.log('------------------');
      // console.log(this.category);
      // console.log(this.availability);
      // console.log(this.minRange);
      // console.log(this.maxRange)
      //  console.log(this.filteredProducts);
    });
  }
}
