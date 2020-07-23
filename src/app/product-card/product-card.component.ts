import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { ShoppingCartService } from '../_services/shopping-cart.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input('product') product: any;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart;

  quantity = 0;
  constructor(private productService: ProductService, private cartService: ShoppingCartService, private alertify: AlertifyService) { 
    
  }

  ngOnInit(): void {
  }

  getQuantity(){
    return this.quantity
  }

  addToCart(){
    this.quantity = this.quantity + 1;
    let data;
    this.productService.get(this.product._id).subscribe(x => {
      data = x;
      data.quantity = 1;
      data.totalPrice = data.price;
      console.log(data);
      this.cartService.addFromShoppingCart(data).subscribe(x => {

      }, error => {
        this.alertify.error('Could not add product to cart!')
      });
    });

  }

  removeFromCart(){
    this.quantity = this.quantity-1

  }
}
