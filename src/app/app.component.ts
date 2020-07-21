import { Component } from '@angular/core';
import { AuthService } from './_services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  jwtHelper = new JwtHelperService();
  constructor(private authService: AuthService){}

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit(): void {
    
    if (this.authService.loggedIn()){
      const token = localStorage.getItem('token');
      this.authService.decodedToken = this.jwtHelper.decodeToken(token);
      console.log(this.jwtHelper.decodeToken(token));
      // this.authService.logged = true;
    }
  }

}
