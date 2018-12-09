import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthData} from './signup/auth-data.model';
import {BehaviorSubject, Subject} from 'rxjs';
import {Router} from '@angular/router';

@Injectable()
export class AuthService {

    authenticated = new BehaviorSubject<boolean>(false);
    admin = new Subject();

    token: string;
    tokenTimer: any;

    constructor(private http: HttpClient, private router: Router) {}

    changeAdmin(data: any) {
        this.admin.next(data);
    }

    createUser(email: string, password: string) {
        const authData: AuthData = {email: email, password: password};
      return this.http.post('http://localhost:3000/api/user/signup', authData);
    }

    loginUser(email: string, password: string) {
        const authData: AuthData = {email: email, password: password};
        return this.http.post<{token: string, expiresIn: number, admin: any}>('http://localhost:3000/api/user/login', authData);
    }

    saveAuthData(token: string, expiration: Date, admin: any) {
        localStorage.setItem('token', token);
        localStorage.setItem('expiration', expiration.toISOString());
        localStorage.setItem('admin', admin);
    }

    clearAuthData() {
        localStorage.removeItem('token');
        localStorage.removeItem('expiration');
        localStorage.removeItem('admin');
    }

    onLogout() {
        this.token = null;
        this.authenticated.next(false);
        clearTimeout(this.tokenTimer);
        this.clearAuthData();
        this.changeAdmin(0);
        localStorage.removeItem('admin');
        this.router.navigate(['/login']);
    }

    setAuthTimer(duration: number) {
        this.tokenTimer = setTimeout(() => {this.onLogout(); }, duration * 1000);
    }

     getAuthData() {
        const token = localStorage.getItem('token');
        const expiration = localStorage.getItem('expiration');
        const admin = localStorage.getItem('admin');
        if (!token || !expiration) {
            return;
        }
        return {
            token: token,
            expirationDate: new Date(expiration),
            admin: admin
        };
    }








}