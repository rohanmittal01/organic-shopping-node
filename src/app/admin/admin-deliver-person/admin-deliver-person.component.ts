import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { DeliveryPersonService } from 'src/app/_services/delivery-person.service';
import { ActiveDialogComponent } from 'src/app/_dialogs/active-dialog/active-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-admin-deliver-person',
  templateUrl: './admin-deliver-person.component.html',
  styleUrls: ['./admin-deliver-person.component.css']
})
export class AdminDeliverPersonComponent{

  deliveryListCollection: Observable<any[]>;
  delivery: any = [];
  filteredDelivery: any[];
  
  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['sno', 'name', 'datejoined', 'isActive', '$key'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;
  array: any;

  constructor(private deliveryService: DeliveryPersonService, private dialog: MatDialog, private alertify: AlertifyService) {
    this.getDeliveryPerson();
    
   }

   getDeliveryPerson(){
    this.deliveryService.getAll().subscribe(delivery => {
      console.log(delivery);
      this.array = delivery;
      this.listData = new MatTableDataSource(this.array);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
  })
   }


   modifyActive(id){
     console.log(this.array);
    let modData = this.array.filter(x => x._id == id);
    modData[0].isActive = !modData[0].isActive;
    console.log(modData[0]);
    this.deliveryService.update(id, modData[0]).subscribe(
      () => {
        this.alertify.success('Modified Successfully');
        // this.router.navigate(['/admin']);
        
      },
      (error) => {
        this.alertify.error(error);
      }
    );
   }
   openDialog(id, e): void {
    let dialogRef = this.dialog.open(ActiveDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog Result: ' + result);
      if (result == 'Yes'){
        this.modifyActive(id);

      }else if (result == 'No'){
        // let modData = this.listData.filteredData.filter(x => x._id == id);
        // console.log('role name: ' + modData[0].isActive);
        // console.log("current: "+e);
        // e = !e;
        // console.log("current: "+e);
        // modData = this.listData.filteredData.filter(x => x._id == id);
      }
    });
    // const dialogRef = this.dialog.open(ActiveDialogComponent, {
    //   width: '250px',
    //   data: {name: this.name, animal: this.animal}
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   // this.animal = result;
    // });
  }
   applyFilter(){
    this.listData.filter = this.searchKey.toLowerCase();
  }
  onSearchClear(){
    this.searchKey = '';
    this.applyFilter();
  }

}
