import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DeliveryPersonService {

  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  create(category){

    return this.http.post(this.baseUrl + 'deliveryperson', category);

  }

  getAll(){
    return this.http.get(this.baseUrl + 'deliveryperson');
  }

  get(id){
    return this.http.get(this.baseUrl + 'deliveryperson/' + id);
  }

  update(id, product){
    return this.http.patch(this.baseUrl + 'deliveryperson/' + id, product);
  }

  delete(id){
    return this.http.delete(this.baseUrl + 'deliveryperson/' + id);
  }
  
}
