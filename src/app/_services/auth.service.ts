import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { Router } from '@angular/router';
import { AlertifyService } from './alertify.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = environment.apiUrl +"users/"
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  // logged = false;
  constructor(private http: HttpClient, private route: Router, private alertify: AlertifyService) { }
  login(model: any) {
    return this.http.post(this.baseUrl + 'login', model);
  }
  loggedIn(){
    let token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }
  logout(){
    if(this.loggedIn()){
      localStorage.removeItem('token');
      // console.log('logged out!');
      this.alertify.warning('Logged Out!');
      window.location.reload();
      this.route.navigate(['/login']);
    }
  }
  register(model: any){
    // console.log(model);
    return this.http.post(this.baseUrl + 'register', model);
  }
  changePassword(model: any){
    return this.http.post(this.baseUrl + 'newPassword', model);
  }
}
