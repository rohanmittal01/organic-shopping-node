import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../_services/category.service';
import { ProductService } from '../_services/product.service';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';
import { ActiveDialogComponent } from '../_dialogs/active-dialog/active-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories$: any;
  product: any = {};
  id;
  constructor(private route: ActivatedRoute, private router: Router, private dialog: MatDialog,
              // tslint:disable-next-line: max-line-length
              private categoryService: CategoryService, private productService: ProductService, private alertify: AlertifyService, private authService: AuthService) {
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
      this.product.modifiedDate = new Date(Date());
      this.product.modifiedBy = this.authService.decodedToken.email;
      this.productService.update(this.id, this.product).subscribe(x => {
        this.alertify.success('Product updated successfully!');
        this.router.navigate(['/admin/products']);
      }, error => {
        this.alertify.error('Product could not be updated!');
      })
    }else{
      this.product.dateAdded = new Date(Date())
      this.product.addedBy = this.authService.decodedToken.email;
      this.product.modifiedDate = new Date(Date())
      this.product.modifiedBy = this.authService.decodedToken.email;
      console.log(this.product);
    this.productService.create(this.product).subscribe(x => {
      this.alertify.success('Product Added Successfully!');
      this.router.navigate(['/admin/products']);
    }, error => {
      this.alertify.error('Product could not be added!');
    });
  }
  }
  delete(){
    console.log(this.product);
    this.productService.delete(this.id).subscribe(x => {
      this.alertify.success('Product deleted successfully!');
      this.router.navigate(['/admin/products']);
    }, error => {
      this.alertify.error('Product could not be deleted!')
    });
  }
  openDialog(): void {
    if (this.id) {
      let dialogRef = this.dialog.open(ActiveDialogComponent);
      dialogRef.afterClosed().subscribe((result) => {
        console.log('Dialog Result: ' + result);
        if (result == 'Yes') {
          this.alertify.success('Deliveryman activation status Confirmed.');
        } else if (result == 'No') {
          // this.search();
          this.product.isAvailable = !this.product.isAvailable;
          this.alertify.warning(
            'Deliveryman activation status change declined.'
          );
        }
      });
    }
  }
}
