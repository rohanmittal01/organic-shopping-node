import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ProductService } from 'src/app/_services/product.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  // products$;
  productListCollection: Observable<any[]>;
  products: any = [];
  filteredProducts: any[];
  subscribe: Subscription;
  
  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['sno', 'title', 'price', '$key'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;
  array: any;

  constructor(private productService: ProductService, private alertify: AlertifyService) {

    this.productService.getAll().subscribe(products => {
      console.log(products);
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

  delete(id){
    console.log(id);
    console.log(this.array);
    this.productService.delete(id).subscribe(x => {
      for (const product in this.array){
        // tslint:disable-next-line: triple-equals
        if (this.array[product]._id == id){
          this.array.splice(product, 1);
          this.listData = new MatTableDataSource(this.array);
          this.listData.sort = this.sort;
          this.listData.paginator = this.paginator;
          this.alertify.success('Product deleted successfully!');
          return;
        }
      }
    }, error => {
      this.alertify.error('Product could not be deleted!');
    });
  }

  ngOnInit(): void {
  }

}
