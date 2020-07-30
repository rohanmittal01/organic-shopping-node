import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { CategoryService } from '../_services/category.service';
import { AlertifyService } from '../_services/alertify.service';
import { OrderService } from '../_services/order.service';

@Component({
  selector: 'my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent{

  categoryListCollection: Observable<any[]>;
  categories: any = [];
  filteredCategories: any[];
  subscribe: Subscription;
  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['sno', 'key', 'name', '$key'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;
  array: any;

  constructor(private categoryService: CategoryService, private alertify: AlertifyService, private orderService: OrderService) {
    this.orderService.getOrders().subscribe(orders => {
      console.log(orders);
    });

    this.categoryService.getAll().subscribe(products => {
      // console.log(products);
      this.array = products;
      this.listData = new MatTableDataSource(this.array);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
    });
   }


   applyFilter(){
    this.listData.filter = this.searchKey.toLowerCase();
  }
  onSearchClear(){
    this.searchKey = '';
    this.applyFilter();
  }

  delete(id) {
    this.categoryService.delete(id).subscribe(
      (x) => {
        for (const category in this.array){
          // tslint:disable-next-line: triple-equals
          if (this.array[category]._id == id){
            this.array.splice(category, 1);
            this.listData = new MatTableDataSource(this.array);
            this.listData.sort = this.sort;
            this.listData.paginator = this.paginator;
            this.alertify.success('Product deleted successfully!');
            return;
          }
        }
      },
      (error) => {
        this.alertify.error('Category could not be deleted!');
      }
    );
  }
}
