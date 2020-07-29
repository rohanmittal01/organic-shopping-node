import { Injectable } from '@angular/core';
import { ActivatedRoute, RouterStateSnapshot, Router } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  checkOutRoute = false;
  paymentGatewayRoute = false;
  orderSuccessRoute = false;
  constructor(private route: ActivatedRoute, private alertify: AlertifyService, private authService: AuthService, private router: Router) { }

  canActivate(router, state: RouterStateSnapshot){
    console.log('-----------------------In Route Service');
    if(this.checkOutRoute == true || this.paymentGatewayRoute == true || this.orderSuccessRoute == true){
      return true;
    }
    this.alertify.error("You shall not pass!");
    //this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
    this.router.navigate(['/shopping-cart']);
    return false;
  }
}
