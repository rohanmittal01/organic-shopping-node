import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  jwtHelper: JwtHelperService;
  loggedIn: Boolean = false;
  isAdmin = false;
  name;
  constructor(public authService: AuthService) {
    this.loggedIn = this.authService.loggedIn();
    // this.isAdmin = authService.decodedToken.isAdmin

  }

  ngOnInit(): void {
    // let token = localStorage.getItem('token');
    // this.authService.decodedToken = this.jwtHelper.decodeToken(token);
    // console.log(this.jwtHelper.decodeToken(token));
    //   // this.authService.logged = true;
    // this.name = this.authService.decodedToken.name;
  }

  logout(){
    this.authService.logout();
  }


}
