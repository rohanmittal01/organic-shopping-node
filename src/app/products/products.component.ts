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
    });
  }

  getProducts() {
    // console.log('prod');
    this.productService.getAllProducts().subscribe((data: any) => {
      this.productListCollection = data;
      this.filter();
    });
  }

  filter() {
    this.route.queryParamMap.subscribe((params) => {
      this.availability = params.get('availability');
      this.category = params.get('category');
      if (this.availability) {
        this.productService.getAll().subscribe((x) => {
          this.filteredProducts = x;
        });
      } else if (this.category) {
        this.filteredProducts = this.productListCollection.filter(
          (p: { category: string }) =>
            p.category.toLowerCase() == this.category.toLowerCase()
        );
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
      console.log(this.category);
      console.log(this.availability);
      //  console.log(this.filteredProducts);
    });
  }
}
