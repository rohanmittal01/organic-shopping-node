import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  model: any = {};
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"

  constructor(private authService: AuthService, private alertify: AlertifyService, private route: Router) { }

  ngOnInit(): void {
  }

  register(){
    console.log(this.model);
    this.authService.register(this.model).subscribe((next) => {
      console.log(next);
      this.alertify.success('Registered successfully');
      // const token = localStorage.getItem('token');
      // console.log(token)
      this.route.navigate(['/login']);
      
    }, error => {
      console.log(error);
      this.alertify.error('Registration Failed');
    });
  }
}
