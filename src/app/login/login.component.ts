import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: any = {};
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"

  constructor(private authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit(): void {
  }

  login(){
    console.log(this.model);
    this.authService.login(this.model).subscribe((next) => {
      console.log(next)
      this.alertify.success('Logged in successfully');
      const token = localStorage.getItem('token');
      console.log(token)
      
    }, error => {
      this.alertify.error(error);
    });
  }

}
