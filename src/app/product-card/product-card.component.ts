import { Component, OnInit, Input } from '@angular/core';

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
  constructor() { }

  ngOnInit(): void {
  }

  getQuantity(){
    return this.quantity
  }

  addToCart(){
    this.quantity = this.quantity + 1
  }

  removeFromCart(){
    this.quantity = this.quantity-1
  }
}
