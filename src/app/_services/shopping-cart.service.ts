import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  baseUrl = environment.apiUrl + 'shopping-cart/';
  constructor(private http: HttpClient, private authService: AuthService) { }

  getCart(){
     return this.http.get(this.baseUrl + this.authService.decodedToken._id);
   }

  clearCart(){
    return this.http.delete(this.baseUrl + this.authService.decodedToken._id);
  }
}
