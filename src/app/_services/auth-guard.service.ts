import { Injectable } from '@angular/core';
import { AlertifyService } from './alertify.service';
import { AuthService } from './auth.service';
import { Router, ActivatedRoute, RouterStateSnapshot, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService  implements CanActivate {

  constructor(private alertify: AlertifyService, private authService: AuthService, private router: Router, private active: ActivatedRoute) { }

  canActivate(router, state: RouterStateSnapshot){

    if(this.authService.loggedIn()){
      return true;
    }
    this.alertify.error("You shall not pass!");
    //this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
    this.router.navigate(['/login']);
    return false;
  }

}
