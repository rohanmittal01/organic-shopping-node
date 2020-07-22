import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  create(product){
    return this.http.post(this.baseUrl + 'products', product);
  }

  getAll(){
    return this.http.get(this.baseUrl + 'products');
  }

  get(id){
    return this.http.get(this.baseUrl + 'products/' + id);
  }

  update(id, product){
    return this.http.patch(this.baseUrl + 'products/' + id, product);
  }

  delete(id){
    return this.http.delete(this.baseUrl + 'products/' + id);
  }
}
