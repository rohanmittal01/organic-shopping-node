import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRoute, RouterStateSnapshot } from '@angular/router';
import { AlertifyService } from './alertify.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedinGuardService implements CanActivate{

  constructor(private alertify: AlertifyService, private authService: AuthService, private router: Router, private active: ActivatedRoute) { }

  canActivate(router, state: RouterStateSnapshot){

    if(!this.authService.loggedIn()){
      this.router.navigate(['/login']);
      return true;
    }
    
    //this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
    this.router.navigate(['/']);
    this.alertify.error("Logged in");
    return false;
  }
}
