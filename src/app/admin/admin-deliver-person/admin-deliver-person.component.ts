import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { DeliveryPersonService } from 'src/app/_services/delivery-person.service';

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
  displayedColumns: string[] = ['sno', 'key', 'name', '$key'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;
  array: any;

  constructor(private deliveryService: DeliveryPersonService) {

    this.deliveryService.getAll().subscribe(delivery => {
      console.log(delivery);
      this.array = delivery;
      this.listData = new MatTableDataSource(this.array);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
  })
   }


   applyFilter(){
    this.listData.filter = this.searchKey.toLowerCase();
  }
  onSearchClear(){
    this.searchKey = '';
    this.applyFilter();
  }

}
