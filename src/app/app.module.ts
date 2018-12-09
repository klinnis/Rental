import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import {RouterModule} from '@angular/router';
import {
    MatButtonModule,
    MatCardModule, MatFormFieldModule,
    MatIconModule, MatInputModule,
    MatListModule,
    MatRadioModule,
    MatSidenavModule,
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
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    CreateCarComponent,
    AdminUsersComponent,
  ],
  imports: [
      BrowserModule,
      MatSidenavModule,
      MatRadioModule,
      FormsModule,
      ReactiveFormsModule,
      BrowserAnimationsModule,
      MatToolbarModule,
      MatIconModule,
      MatListModule,
      MatToolbarModule,
      MatSidenavModule,
      MatButtonModule,
      MatCardModule,
      MatInputModule,
      MatFormFieldModule,
      HttpClientModule,
      RouterModule.forRoot([
        {path: 'login', component: LoginComponent},
        {path: 'register', component: SignupComponent},
        {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
          {path: 'create-car', component: CreateCarComponent}
    ]),
  ],
  providers: [AuthService, AuthGuard, LoginComponent, AdminService],
  bootstrap: [AppComponent]
})


export class AppModule { }
