import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';
import {Injectable} from '@angular/core';


@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private authservice: AuthService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
         this.authservice.authenticated.subscribe(isAuth => {
             if (!isAuth) {
                 this.router.navigate(['/login']);
             }
             return isAuth;
         });
        return true;
    }
}