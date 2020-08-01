import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  create(category){

    return this.http.post(this.baseUrl + 'categories', category);

  }

  getAll(){
    return this.http.get(this.baseUrl + 'categories');
  }

  get(id){
    return this.http.get(this.baseUrl + 'categories/' + id);
  }

  update(id, product){
    return this.http.patch(this.baseUrl + 'categories/' + id, product);
  }

  delete(id){
    return this.http.delete(this.baseUrl + 'categories/' + id);
  }

}
