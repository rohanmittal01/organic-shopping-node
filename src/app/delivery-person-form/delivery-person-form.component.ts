import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../_services/category.service';
import { AlertifyService } from '../_services/alertify.service';
import { MatDialog } from '@angular/material/dialog';
import { ActiveDialogComponent } from '../_dialogs/active-dialog/active-dialog.component';

@Component({
  selector: 'app-delivery-person-form',
  templateUrl: './delivery-person-form.component.html',
  styleUrls: ['./delivery-person-form.component.css']
})
export class DeliveryPersonFormComponent implements OnInit {

  categories$: any;
  deliveryperson: any = {};
  address: any = {};
  id;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private alertify: AlertifyService,
    private dialog: MatDialog
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      categoryService.get(this.id).subscribe((categories) => {
        this.deliveryperson = categories;
        console.log(categories);
      });
    }else{
      this.deliveryperson.isActive = true;
    }
    
  }

  ngOnInit(): void {}

  // save() {
  //   console.log(this.product);
  //   if (this.id) {
  //     this.categoryService.update(this.id, this.product).subscribe(
  //       (x) => {
  //         this.alertify.success('Category updated successfully!');
  //         this.router.navigate(['/admin/categories']);
  //       },
  //       (error) => {
  //         this.alertify.error('Category could not be updated!');
  //       }
  //     );
  //   } else {
  //     this.categoryService.create(this.product).subscribe(
  //       (x) => {
  //         this.alertify.success('Category Added Successfully!');
  //         this.router.navigate(['/admin/categories']);
  //       },
  //       (error) => {
  //         this.alertify.error('Category could not be added!');
  //       }
  //     );
  //   }
  // }

  save(){
    this.deliveryperson = {
      name: this.deliveryperson.name,
      dateJoined: new Date(Date()),
      address: this.address,
      isActive: this.deliveryperson.isActive
    }
    console.log(this.deliveryperson);
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

  openDialog(): void {
    if(this.id){
    let dialogRef = this.dialog.open(ActiveDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog Result: ' + result);
      if (result == 'Yes'){
        this.alertify.success('Deliveryman activation status Confirmed.');
       
      }else if (result == 'No'){
        // this.search();
        this.deliveryperson.isActive = !this.deliveryperson.isActive
        this.alertify.warning('Deliveryman activation status change declined.');
      }
    });
  }
  }

}
