import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import {RouterModule} from '@angular/router';
import {
    MatButtonModule,
    MatCardModule, MatDatepickerModule, MatFormFieldModule,
    MatIconModule, MatInputModule,
    MatListModule, MatNativeDateModule, MatPaginatorModule,
    MatRadioModule,
    MatSidenavModule, MatTableModule,
    MatToolbarModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoginComponent} from './auth/login/login.component';
import {SignupComponent} from './auth/signup/signup.component';
import {AuthService} from './auth/auth.service';
import {HttpClientModule} from '@angular/common/http';
import {HomeComponent} from './home/home.component';
import {AuthGuard} from './auth/auth.guard';
import { CreateCarComponent } from './create-car/create-car.component';
import {AdminService} from './auth/admin/admin.service';
import {AdminUsersComponent} from './auth/admin/admin-users/admin-users.component';
import { CarsComponent } from './cars/cars.component';
import {CarsService} from './cars/cars.service';
import {DatePickerComponent} from './datepicker/datepicker.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';






@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    CreateCarComponent,
    AdminUsersComponent,
    CarsComponent,
    DatePickerComponent,
  ],
  imports: [
      BrowserModule,
      BsDatepickerModule.forRoot(),
      MatSidenavModule,
      MatRadioModule,
      FormsModule,
      ReactiveFormsModule,
      BrowserAnimationsModule,
      MatToolbarModule,
      MatIconModule,
      MatListModule,
      MatTableModule,
      MatPaginatorModule,
      MatToolbarModule,
      MatSidenavModule,
      MatButtonModule,
      MatCardModule,
      MatInputModule,
      MatFormFieldModule,
      HttpClientModule,
      MatDatepickerModule,
      MatNativeDateModule,
      RouterModule.forRoot([
        {path: 'login', component: LoginComponent},
        {path: 'register', component: SignupComponent},
        {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
        {path: 'create-car', component: CreateCarComponent},
        {path: 'admin-users', component: AdminUsersComponent},
        {path: 'cars', component: CarsComponent},
    ]),
  ],
  providers: [AuthService, AuthGuard, LoginComponent, AdminService, CarsService],
  bootstrap: [AppComponent]
})


export class AppModule { }
