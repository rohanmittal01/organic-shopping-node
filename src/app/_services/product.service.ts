import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  create(product){

    return this.http.post('http://localhost:3000/products', product);

  }

  getAll(){
    return this.http.get('http://localhost:3000/products');
  }

  get(id){
    return this.http.get('http://localhost:3000/products/'+id);
  }

}
