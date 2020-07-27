import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ProductService } from 'src/app/_services/product.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { MatDialog } from '@angular/material/dialog';
import { ActiveDialogComponent } from 'src/app/_dialogs/active-dialog/active-dialog.component';

@Component({
  // tslint:disable-next-line: component-selector
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
  displayedColumns: string[] = ['sno', 'title', 'price', 'isAvailable', '$key'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;
  array: any;

  constructor(private productService: ProductService, private alertify: AlertifyService, private dialog: MatDialog) {

    this.productService.getAllProducts().subscribe(products => {
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

  modifyActive(id) {
    console.log(this.array);
    // tslint:disable-next-line: triple-equals
    const modData = this.array.filter((x) => x._id == id);
    modData[0].isAvailable = !modData[0].isAvailable;
    console.log(modData[0]);
    this.productService.update(id, modData[0]).subscribe(
      () => {
        this.alertify.success('Product Availability Modified Successfully');
        // this.router.navigate(['/admin']);
      },
      (error) => {
        this.alertify.error(error);
      }
    );
  }

  openDialog(id, e): void {
    const dialogRef = this.dialog.open(ActiveDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialog Result: ' + result);
      // tslint:disable-next-line: triple-equals
      if (result == 'Yes') {
        this.modifyActive(id);
      // tslint:disable-next-line: triple-equals
      } else if (result == 'No') {
        // let modData = this.listData.filteredData.filter(x => x._id == id);
        // console.log('role name: ' + modData[0].isActive);
        // console.log("current: "+e);
        // e = !e;
        // console.log("current: "+e);
        // modData = this.listData.filteredData.filter(x => x._id == id);
      }
    });
  }

  ngOnInit(): void {
  }

}
