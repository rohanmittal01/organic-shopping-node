import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }


  registerOtp(credentials){
    return this.http.post(this.baseUrl + 'register', credentials);
  }
}
