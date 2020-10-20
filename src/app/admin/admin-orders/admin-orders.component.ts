import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription } from 'rxjs';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { OrderService } from 'src/app/_services/order.service';

@Component({
  selector: 'admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {

 
  categoryListCollection: Observable<any[]>;
  categories: any = [];
  filteredCategories: any[];
  subscribe: Subscription;
  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['sno', 'datePlaced', 'quantity', 'totalAmount', 'status', '$key'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;
  array: any;
  filteredData: any;
  dateFilterVar: any;
  constructor(private alertify: AlertifyService, private orderService: OrderService) {

    this.orderService.getAllOrders().subscribe(orders => {
      this.convertDate(orders);
    });

   }
   convertDate(orders){
    // tslint:disable-next-line: forin
    for (const id in orders){
      // orders.datePlaced = orders[id].datePlaced.toLocaleString();
      orders[id].datePlaced = new Date(orders[id].datePlaced).toLocaleString();
    }
    console.log(orders);
    this.filteredData = orders;
    this.array = orders;
    this.listData = new MatTableDataSource(this.array);
    this.listData.sort = this.sort;
    this.listData.paginator = this.paginator;
   }

   applyFilter(){
    this.listData.filter = this.searchKey.toLowerCase();
  }

  dateFiltering(){
    console.log(this.dateFilterVar);
    if(this.dateFilterVar == 'All Days'){
      this.filteredData = this.array;
    }else if(this.dateFilterVar == 'last 30 days'){
      this.filter(30);
    }else if(this.dateFilterVar ==  'last 180 days'){
      this.filter(180);
    }


    this.listData = new MatTableDataSource(this.filteredData);
    this.listData.sort = this.sort;
    this.listData.paginator = this.paginator;
  }
  
  filter(days){
    var now = new Date();
    let yesterday = new Date(new Date().getTime() - (0 * 24 * 60 * 60 * 1000)).toLocaleString();
    let last7Days = new Date(new Date().getTime() - (days * 24 * 60 * 60 * 1000)).toLocaleString();
    console.log(yesterday);
    console.log(last7Days);
    console.log(this.array.datePlaced);
    let arr = [];
      // tslint:disable-next-line: forin
    for (const id in this.array){
        // orders.datePlaced = orders[id].datePlaced.toLocaleString();
        // console.log(this.array[id].datePlaced);
        if (this.array[id].datePlaced <= yesterday && this.array[id].datePlaced >= last7Days) {
          arr.push(this.array[id]);
        }
      }
    this.filteredData = arr;
  }
  onSearchClear(){
    this.searchKey = '';
    this.applyFilter();
  }





  ngOnInit(): void {
   
  }

}
