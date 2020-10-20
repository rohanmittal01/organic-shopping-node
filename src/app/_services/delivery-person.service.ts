import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DeliveryPersonService {

  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  create(deliveryperson){

    return this.http.post(this.baseUrl + 'deliveryperson', deliveryperson);

  }

  getAll(){
    return this.http.get(this.baseUrl + 'deliveryperson');
  }

  get(id){
    return this.http.get(this.baseUrl + 'deliveryperson/' + id);
  }

  getAvailable(){
    return this.http.get(this.baseUrl + 'deliveryperson/available');
  }

  update(id, person){
    return this.http.patch(this.baseUrl + 'deliveryperson/' + id, person);
  }

  delete(id){
    return this.http.delete(this.baseUrl + 'deliveryperson/' + id);
  }
  
}
