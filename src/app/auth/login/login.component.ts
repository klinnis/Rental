import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import { takeUntil } from 'rxjs/operators';


@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


    auth: boolean;
     token: string;



    constructor(private authservice: AuthService, private router: Router) {}

    ngOnInit() {

    }



onLogin(form: NgForm) {

        if (form.invalid) {
            return;
        }

this.authservice.loginUser(form.value.email, form.value.password).subscribe(res => {


    const token = res.token;
    const admin = res.admin;

    if (token) {
        this.token = token;
        this.authservice.changeAdmin(admin);
        const expires = res.expiresIn;
        this.authservice.setAuthTimer(expires);
        this.authservice.authenticated.next(true);
        const now = new Date();
        const expirationDate = new Date(now.getTime() + expires * 1000);
        this.authservice.saveAuthData(token, expirationDate, admin);
        this.router.navigate(['/home']);

    }
});
}





    autoAuthUser() {
        const authInformation = this.authservice.getAuthData();
        if (!authInformation) {
            return;
        }
        const now = new Date();
        const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
        if (expiresIn > 0) {
            this.token = authInformation.token;
            this.authservice.authenticated.next(true);
        }

    }
}
