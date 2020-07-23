import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { CategoryService } from '../_services/category.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-categoryform',
  templateUrl: './categoryform.component.html',
  styleUrls: ['./categoryform.component.css'],
})
export class CategoryformComponent implements OnInit {
  categories$: any;
  product: any = {};
  id;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private alertify: AlertifyService,
    private authService: AuthService
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      categoryService.get(this.id).subscribe((categories) => {
        this.product = categories;
        console.log(categories);
      });
    }
  }

  ngOnInit(): void {}

  save() {
    console.log(this.product);
    if (this.id) {
      this.product.modifiedDate = new Date(Date());
      this.product.modifiedBy = this.authService.decodedToken.email;
      this.categoryService.update(this.id, this.product).subscribe(
        (x) => {
          this.alertify.success('Category updated successfully!');
          this.router.navigate(['/admin/categories']);
        },
        (error) => {
          this.alertify.error('Category could not be updated!');
        }
      );
    } else {
      this.product.dateAdded = new Date(Date())
      this.product.addedBy = this.authService.decodedToken.email;
      this.product.modifiedDate = new Date(Date())
      this.product.modifiedBy = this.authService.decodedToken.email;
      this.categoryService.create(this.product).subscribe(
        (x) => {
          this.alertify.success('Category Added Successfully!');
          this.router.navigate(['/admin/categories']);
        },
        (error) => {
          this.alertify.error('Category could not be added!');
        }
      );
    }
  }

  delete() {
    this.categoryService.delete(this.id).subscribe(
      (x) => {
        this.alertify.success('Category deleted successfully!');
        this.router.navigate(['/admin/categories']);
      },
      (error) => {
        this.alertify.error('Category could not be deleted!');
      }
    );
  }
}
