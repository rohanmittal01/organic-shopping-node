import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { timeout } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: any = {};
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
  jwtHelper: JwtHelperService;
  constructor(private authService: AuthService, private alertify: AlertifyService, private route: Router) { }

  ngOnInit(): void {
    if(this.authService.loggedIn){
      this.route.navigate(['/']);
    }
  }

  login(){
    console.log(this.model);
    this.authService.login(this.model).subscribe((next: any) => {
      console.log(next)
      this.alertify.success('Logged in successfully');
      
      // this.authService.logged = true;
      localStorage.setItem('token', next.token);
      this.authService.decodedToken = this.jwtHelper.decodeToken(next.token);
      window.location.reload();
      this.route.navigate(['/']);

      // this.f1();
     
              
              
      const token = localStorage.getItem('token');
      console.log(token);
    }, error => {
      console.log(error.error);
      this.alertify.error(error.error);
    });
  }

}
