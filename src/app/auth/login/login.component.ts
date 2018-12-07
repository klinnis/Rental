import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../auth.service';
import {Subject, Subscription} from 'rxjs';
import {Router} from '@angular/router';


@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


    auth: boolean;
    private tokenTimer: any;
    entered: any;


    private token: string;
    constructor(private authservice: AuthService, private router: Router) {}

onLogin(form: NgForm) {


        if (form.invalid) {
            return;
        }

this.authservice.loginUser(form.value.email, form.value.password).subscribe(res => {

    console.log(res);
    const token = res.token;
    const admin = res.admin;
    console.log(admin);


    if (token) {
        this.token = token;
        this.authservice.changeAdmin(admin);
        const expires = res.expiresIn;
        this.setAuthTimer(expires);
        this.authservice.authenticated.next(true);
        this.router.navigate(['/home']);
        const now = new Date();
        const expirationDate = new Date(now.getTime() + expires * 1000);
        this.saveAuthData(token, expirationDate);

    }
});



}

ngOnInit() {

}

    private getAuthData() {
        const token = localStorage.getItem('token');
        const expiration = localStorage.getItem('expiration');
        if (!token || !expiration) {
            return;
        }
        return {
            token: token,
            expirationDate: new Date(expiration)
        };
    }



    private setAuthTimer(duration: number) {
        this.tokenTimer = setTimeout(() => {this.onLogout(); }, duration * 1000);
    }


    autoAuthUser() {
        const authInformation = this.getAuthData();
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

    saveAuthData(token: string, expiration: Date) {
        localStorage.setItem('token', token);
        localStorage.setItem('expiration', expiration.toISOString());
    }

    clearAuthData() {
        localStorage.removeItem('token');
        localStorage.removeItem('expiration');
        localStorage.removeItem('admin');
    }


    onLogout() {
        this.token = null;
        this.authservice.authenticated.next(false);
        clearTimeout(this.tokenTimer);
        this.clearAuthData();
        this.authservice.changeAdmin(0);
        localStorage.removeItem('admin');
        this.router.navigate(['/login']);
    }



}
