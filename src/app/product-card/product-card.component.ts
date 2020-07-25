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
    // console.log(this.shoppingCart)
    if (!this.shoppingCart){
      return 0;
    }
    // tslint:disable-next-line: prefer-const
    let x: any = this.shoppingCart;
    let quantity = 0;
    // if (this.shoppingCart.items[]){
    // quantity = (this.shoppingCart[this.product.$key]).quantity;
    // }
    for( let cart in this.shoppingCart.items){
      // console.log(cart);
      if(this.shoppingCart.items[cart]._id == this.product._id){
         this.quantity = this.shoppingCart.items[cart].quantity;
         return this.quantity;
      }
    }

    return this.quantity;
  }

  addToCart() {
    // console.log(this.product);
    // tslint:disable-next-line: triple-equals
    // console.log(this.cartService.cart);
    if (this.cartService.cart != [] && this.cartService.cart != undefined) {
      // console.log('hee')
      let data;
      this.productService.get(this.product._id).subscribe((x) => {
        data = x;
        data.quantity = 1;
        data.totalPrice = data.price;
        this.cartService.addFromProduct(data).subscribe(
          (x) => {
            this.getQuantity();
          },
          (error) => {
            this.alertify.error('Could not add product to cart!');
          }
        );
      });
    }else{
      // console.log('heê333333')
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

  addUsingButton(){
    this.quantity = this.quantity + 1;
    console.log(this.quantity);
    this.cartService.addToCart(this.product);
  }

  removeFromCart() {
    this.quantity = this.quantity - 1;
  }
}
