import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../_services/category.service';
import { ProductService } from '../_services/product.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories$: any;
  product: any = {};
  id;
  constructor(private route: ActivatedRoute, private router: Router,
              private categoryService: CategoryService, private productService: ProductService, private alertify: AlertifyService) {
      
      categoryService.getAll().subscribe(categories => {
        this.categories$ = categories;
        console.log(categories);
        this.getProductInfo();
      })
      this.id = this.route.snapshot.paramMap.get('id');

      

     }

  ngOnInit(): void {

  }

  getProductInfo(){
    if (this.id){
      this.productService.get(this.id).subscribe(p => {
        this.product = p;
        console.log(p);
      });
    }
  }
  save(){
    console.log(this.product);
    if(this.id){
      this.productService.update(this.id, this.product).subscribe(x => {
        this.alertify.success('Product updated successfully!');
        this.router.navigate(['/admin/products']);
      }, error => {
        this.alertify.error('Product could not be updated!');
      })
    }else{
    this.productService.create(this.product).subscribe(x => {
      this.alertify.success('Product Added Successfully!');
      this.router.navigate(['/admin/products']);
    }, error => {
      this.alertify.error('Product could not be added!');
    });
  }
  }

  delete(){
    this.productService.delete(this.id).subscribe(x => {
      this.alertify.success('Product deleted successfully!');
      this.router.navigate(['/admin/products']);
    }, error => {
      this.alertify.error('Product could not be deleted!')
    });
  }
}
