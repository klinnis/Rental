import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

   subscription: Subscription;
    auth: any;
    isAdmin: any;

  constructor(private authservice: AuthService) { }



  ngOnInit() {
    this.subscription = this.authservice.authenticated.subscribe(res => {this.auth = res });
    this.authservice.admin.subscribe(res1 => this.isAdmin = res1);
  }

  onLogout() {
    this.authservice.authenticated.next(false);
      this.authservice.changeAdmin(0);
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
  }

  ngOnDestroy() {
      this.subscription.unsubscribe();
  }


}
