import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { Router } from '@angular/router';
import { AlertifyService } from './alertify.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = "http://localhost:3000/users/"
  jwtHelper = new JwtHelperService();
  decodedToken: any;

  constructor(private http: HttpClient, private route: Router, private alertify: AlertifyService) { }

  login(model: any) {
    return this.http.post(this.baseUrl + 'login', model)
    // .pipe(
    //   map((response: any) => {
    //     const user = response;
    //     // console.log(user);
    //     if (user) {
    //       localStorage.setItem('token', user.token);
    //       this.route.navigate(['/']);
    //     }
    //   })
    // );
  }

  loggedIn(){
    let token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }


  logout(){
    if(this.loggedIn()){
      localStorage.removeItem('token');
      console.log('logged out!');
      this.alertify.warning('Logged Out!');
      this.route.navigate(['/login']);
    }
  }
  register(model: any){
    // console.log(model);
    return this.http.post(this.baseUrl + 'register', model);
  }

  // modify(model: any){
  //   return this.http.post(this.dataUrl + 'modify', model);
  // }

  changePassword(model: any){
    return this.http.post(this.baseUrl + 'newPassword', model);
  }



}
