import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Subscription} from 'rxjs';
import {CarsService} from '../cars/cars.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

   subscription: Subscription;
    auth: any;
    admin: any;
    temp = '1';


  constructor(private authservice: AuthService, private carservice: CarsService) {

      const data = this.authservice.getAuthData();
      if (data) {
          if (data.admin === this.temp) {
              this.admin = 1;
          } else {
              this.admin = 0;
          }
      }
  }

  ngOnInit() {


      this.subscription = this.authservice.authenticated.subscribe(res => {
        this.auth = res; });

       this.authservice.admin.subscribe(res => {
           this.admin = res;
          });
  }

  onLogout() {
    this.authservice.authenticated.next(false);
      this.authservice.changeAdmin(false);
      localStorage.removeItem('token');
      localStorage.removeItem('admin');
      localStorage.removeItem('expiration');
      localStorage.clear();
  }

  ngOnDestroy() {
      this.subscription.unsubscribe();
  }


}
