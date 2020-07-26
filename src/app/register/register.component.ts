import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { PasswordService } from '../_services/password.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  model: any = {};
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  passwordSent = false;
  codeGenerated = '';
  otpValue = '';
  @ViewChild('registerForm', {static: true}) loginForm: NgForm;
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any){
    if (this.loginForm.dirty){
      $event.returnValue = true;
    }
  }


  constructor(private authService: AuthService, private alertify: AlertifyService, private route: Router, private passwordService: PasswordService) { }

  ngOnInit(): void {
  }

  randomString() {
    const chars =
      '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
    const stringLength = 10;
    let randomstring = '';
    for (let i = 0; i < stringLength; i++) {
      const rnum = Math.floor(Math.random() * chars.length);
      randomstring += chars.substring(rnum, rnum + 1);
    }
    this.codeGenerated = randomstring;
    return 0;
  }

addButtonPressed(){
  this.passwordSent = false;
  console.log(this.model);
  this.randomString();
  console.log(this.codeGenerated);

  this.sendOtp(this.model);
}

sendOtp(model){
  if (model.password == model.confirmPassword){
    const otpModel = {
      email: this.model.email,
      name: this.model.name,
      code: this.codeGenerated
    };
    this.passwordService.registerOtp(otpModel).subscribe(x => {
      this.passwordSent = true;
      console.log(x);
    }, error => {
      console.log(error);
      this.alertify.success('OTP Sent');
      this.passwordSent = true;
    });
  }else{
    this.alertify.error('Password not confirmed');
  }

}

otpSubmitPressed(){
  // tslint:disable-next-line: triple-equals
  if(this.codeGenerated == this.otpValue){
    this.register();
  }else{
    this.alertify.error("Incorrect OTP!")
  }
}

  register(){
    console.log(this.model);
    const model = {
      name: this.model.name,
      email: this.model.email,
      phoneNumber: this.model.phoneNumber,
      password: this.model.password
    };
    this.authService.register(model).subscribe((next) => {
      console.log(next);
      this.alertify.success('Registered successfully');
      // const token = localStorage.getItem('token');
      // console.log(token)
      this.route.navigate(['/login']);
      
    }, error => {
      console.log(error);
      if(error.error.name == "MongoError"){
        this.alertify.error('Account already exists');
        this.route.navigate(['/login']);
      }
      this.alertify.error('Registration Failed');
    });
  }


}
