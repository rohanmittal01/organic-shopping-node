import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: any = {};
  id;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    // tslint:disable-next-line: max-line-length
    private productService: ProductService
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getProductInfo();
    console.log(this.id);
  }

  getProductInfo() {
    if (this.id) {
      this.productService.get(this.id).subscribe((p) => {
        this.product = p;
        console.log(p);
      });
    }
  }

  ngOnInit(): void {}
}
