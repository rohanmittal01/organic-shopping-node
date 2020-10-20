import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  orderData: any = {};
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient, private authService: AuthService) { }

  postOrder(){
    return this.http.post(this.baseUrl + 'orders', this.orderData);
  }

  getOrders(){
    return this.http.get(this.baseUrl + 'orders/' + this.authService.decodedToken._id);
  }

  getOrderById(id){
    return this.http.get(this.baseUrl + 'order/' + id);
  }


  getAllOrders(){
    return this.http.get(this.baseUrl + 'orders/admin/' + this.authService.decodedToken._id);
  }
  
  getOrderDetails(orderId){
    return this.http.get(this.baseUrl+'order/id/'+orderId);
  }

  updateOrder(params){
    return this.http.patch(this.baseUrl + 'orders/' + params.id, params.body);
  }

}
