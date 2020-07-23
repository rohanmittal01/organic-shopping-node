import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { ShoppingCartService } from '../_services/shopping-cart.service';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {
  @Input('product') product: any;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart;

  quantity = 0;
  constructor(
    private productService: ProductService,
    private cartService: ShoppingCartService,
    private alertify: AlertifyService,
    private authService: AuthService
  ) {
    
  }

  ngOnInit(): void {}

  getQuantity() {
    return this.quantity;
  }

  addToCart() {
    // console.log(this.product);
    // tslint:disable-next-line: triple-equals
    console.log(this.cartService.cart);
    if (this.cartService.cart != [] && this.cartService.cart != undefined) {
      console.log('hee')
      let data;
      this.productService.get(this.product._id).subscribe((x) => {
        data = x;
        data.quantity = 1;
        data.totalPrice = data.price;
        this.cartService.addFromShoppingCart(data).subscribe(
          (x) => {},
          (error) => {
            this.alertify.error('Could not add product to cart!');
          }
        );
      });
    }else{
      console.log('heê333333')
      let data;
      this.productService.get(this.product._id).subscribe((x) => {
        data = x;
        data.quantity = 1;
        data.totalPrice = data.price;
        data = {
          userId: this.authService.decodedToken._id,
          items: [data]
        };
        this.cartService.createShoppingCart(data).subscribe(
          (x) => {},
          (error) => {
            this.alertify.error('Could not add product to cart!');
          }
        );
      });
    }
  }

  removeFromCart() {
    this.quantity = this.quantity - 1;
  }
}
