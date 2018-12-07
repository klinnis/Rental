import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthData} from './signup/auth-data.model';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable()
export class AuthService {

    authenticated = new BehaviorSubject<boolean>(false);
    admin = new Subject();

    token: string;
    tokenTimer: any;

    constructor(private http: HttpClient) {}

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








}