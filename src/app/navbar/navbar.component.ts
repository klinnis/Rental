import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Observable, Subscription} from 'rxjs';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

   subscription: Subscription;
    auth: any;
    isAdmin: any;
    admin: any;


  constructor(private authservice: AuthService) {

  }



  ngOnInit() {
    this.subscription = this.authservice.authenticated.subscribe(res => {
        this.auth = res; });

       this.authservice.admin.subscribe(res => this.admin = res);


  }

  onLogout() {
    this.authservice.authenticated.next(false);
      this.authservice.changeAdmin(false);
      localStorage.removeItem('token');
      localStorage.removeItem('admin');
      localStorage.removeItem('expiration');
  }

  ngOnDestroy() {
      this.subscription.unsubscribe();
  }


}
