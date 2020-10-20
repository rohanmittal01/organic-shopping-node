import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule} from '@angular/material/dialog';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { LoginComponent } from './login/login.component';
import { NoopAnimationPlayer } from '@angular/animations';
import { ProductFilterComponent } from './products/product-filter/product-filter.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductService } from './_services/product.service';
import { AuthGuardService } from './_services/auth-guard.service';
import { RegisterComponent } from './register/register.component';
import { AuthService } from './_services/auth.service';
import { AlertifyService } from './_services/alertify.service';
import { LoggedinGuardService } from './_services/loggedin-guard.service';
import { ProductFormComponent } from './product-form/product-form.component';
import { AdminDeliverPersonComponent } from './admin/admin-deliver-person/admin-deliver-person.component';
import { AdminCategoriesComponent } from './admin/admin-categories/admin-categories.component';
import { CategoryformComponent } from './categoryform/categoryform.component';
import { DeliveryPersonFormComponent } from './delivery-person-form/delivery-person-form.component';
import { ActiveDialogComponent } from './_dialogs/active-dialog/active-dialog.component';
import { BannerComponent } from './banner/banner.component';
import { ShoppingCartSummaryComponent } from './shopping-cart-summary/shopping-cart-summary.component';
import { CheckOutService } from './_guards/check-out.service';
import { PaymentGatewayComponent } from './payment-gateway/payment-gateway.component';
import { CategoryService } from './_services/category.service';
import { DeliveryPersonService } from './_services/delivery-person.service';
import { PasswordService } from './_services/password.service';
import { ShoppingCartService } from './_services/shopping-cart.service';
import { OrderSuccessService } from './_guards/order-success.service';
import { NoRouteComponent } from './no-route/no-route.component';
import { RouteService } from './_guards/route.service';
import { MoreOrderDetailsComponent } from './my-orders/more-order-details/more-order-details.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent,
    ProductFilterComponent,
    ProductCardComponent,
    RegisterComponent,
    ProductFormComponent,
    AdminDeliverPersonComponent,
    AdminCategoriesComponent,
    CategoryformComponent,
    DeliveryPersonFormComponent,
    ActiveDialogComponent,
    BannerComponent,
    ShoppingCartSummaryComponent,
    PaymentGatewayComponent,
    NoRouteComponent,
    MoreOrderDetailsComponent,
    ProductDetailsComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTableModule,
    MatIconModule,
    MatSortModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    MatDialogModule,
    RouterModule.forRoot([
      {path: '', component: ProductsComponent, canActivate: [AuthGuardService]},
      {path: 'products', component: ProductsComponent, canActivate: [AuthGuardService]},
      {path: 'products/:id', component: ProductDetailsComponent, canActivate: [AuthGuardService]},
      {path: 'shopping-cart', component: ShoppingCartComponent, canActivate: [AuthGuardService]},
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},

      {path: 'check-out', component: CheckOutComponent, canActivate: [AuthGuardService, RouteService]},
      {path: 'payment-gateway', component: PaymentGatewayComponent, canActivate: [AuthGuardService, RouteService]},
      {path: 'order-success', component: OrderSuccessComponent, canActivate: [AuthGuardService, RouteService]},
      {path: 'my/orders', component: MyOrdersComponent, canActivate: [AuthGuardService]},
      {path: 'my/orders/:id', component: MoreOrderDetailsComponent, canActivate: [AuthGuardService]},
     {path: 'admin/products/new', component: ProductFormComponent},
      {path: 'admin/products/:id', component: ProductFormComponent},
      {path: 'admin/products', component: AdminProductsComponent, canActivate: [AuthGuardService]},
      {path: 'admin/orders', component: AdminOrdersComponent, canActivate: [AuthGuardService]},
      {path: 'admin/delivery-person', component: AdminDeliverPersonComponent, canActivate: [AuthGuardService]},
      {path: 'admin/categories/new', component: CategoryformComponent, canActivate: [AuthGuardService]},
      {path: 'admin/categories/:id', component: CategoryformComponent, canActivate: [AuthGuardService]},
      {path: 'admin/categories', component: AdminCategoriesComponent, canActivate: [AuthGuardService]},
      {path: 'admin/deliveryperson/new', component: DeliveryPersonFormComponent, canActivate: [AuthGuardService]},
      {path: 'admin/deliveryperson/:id', component: DeliveryPersonFormComponent, canActivate: [AuthGuardService]},
      {path: 'admin/deliveryperson', component: AdminDeliverPersonComponent, canActivate: [AuthGuardService]},
      {path: '**', component: NoRouteComponent, canActivate: [AuthGuardService]}
    ])
  ],
  providers: [
    ProductService,
    AuthService,
    AlertifyService,
    AuthGuardService,
    LoggedinGuardService,
    ProductService,
    CheckOutService,
    CategoryService,
    DeliveryPersonService,
    PasswordService,
    ShoppingCartService,
    OrderSuccessService,
    RouteService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
