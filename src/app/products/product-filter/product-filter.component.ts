import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CategoryService } from 'src/app/_services/category.service';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit{

  categories: any[];
  subscribe2: Subscription;
  @Input('category') category: any;
  @Input('avialability') availability: any;
  @Input('range') range: any = {};
  // range: {min: number, max: number} = {min: 0, max: 1000};
  // @Input('min') min: any;
  // @Input('max') max: any;
  constructor(private categoryService: CategoryService) {

    categoryService.getAll().subscribe((x: any) => {
      this.categories = x;
      console.log(this.categories);
    })

  }

  print(){
    console.log(this.range);
  }

  
  ngOnInit(): void {
  }

}
