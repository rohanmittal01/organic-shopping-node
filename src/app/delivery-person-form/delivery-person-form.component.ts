import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../_services/category.service';
import { AlertifyService } from '../_services/alertify.service';
import { MatDialog } from '@angular/material/dialog';
import { ActiveDialogComponent } from '../_dialogs/active-dialog/active-dialog.component';
import { DeliveryPersonService } from '../_services/delivery-person.service';

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
    private deliverypersonService: DeliveryPersonService,
    private alertify: AlertifyService,
    private dialog: MatDialog
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      deliverypersonService.get(this.id).subscribe((categories: any) => {
        this.deliveryperson = categories;
        this.address = categories.address;
        console.log(categories);
      });
    }else{
      this.deliveryperson.isActive = true;
    }
    
  }

  ngOnInit(): void {}

  save() {
    this.deliveryperson = {
          name: this.deliveryperson.name,
          phoneNumber: this.deliveryperson.phoneNumber,
          dateJoined: new Date(Date()),
          address: this.address,
          isActive: this.deliveryperson.isActive
        };
    console.log(this.deliveryperson);
    if (this.id) {
      this.deliverypersonService.update(this.id, this.deliveryperson).subscribe((x) => {
          this.alertify.success('Category updated successfully!');
          this.router.navigate(['/admin/delivery-person']);
        },
        (error) => {
          this.alertify.error('Category could not be updated!');
        });
    } else {
      this.deliverypersonService.create(this.deliveryperson).subscribe(
        (x) => {
          this.alertify.success('Category Added Successfully!');
          this.router.navigate(['/admin/delivery-person']);
        },
        (error) => {
          this.alertify.error('Category could not be added!');
        }
      );
    }
  }



  delete() {
    this.deliverypersonService.delete(this.id).subscribe(
      (x) => {
        this.alertify.success('Category deleted successfully!');
        this.router.navigate(['/admin/delivery-person']);
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
