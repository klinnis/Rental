import {Component, Injectable, OnInit} from '@angular/core';
import {LoginComponent} from './auth/login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

@Injectable()
export class AppComponent implements OnInit {
  title = 'Rental';

  constructor(private login: LoginComponent) {}

  ngOnInit() {
    this.login.autoAuthUser();
  }

}
