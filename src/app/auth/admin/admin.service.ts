import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

import {Car} from '../../create-car/car.model';
import {Subject} from 'rxjs';

@Injectable()
export class AdminService {

    rented = new Subject();

    constructor(private http: HttpClient, private router: Router) {}

   createCar(brand: string, model: string, power: string, seats: number, imgUrl: string) {
       const carData: Car = {brand: brand, model: model, power: power, seats: seats, imgUrl: imgUrl};
       return this.http.post('http://localhost:3000/api/admin/create-car', carData);
   }

   getUsers() {
        return this.http.get('http://localhost:3000/api/admin/users');
   }

   deleteUser(email: string) {
        const dataid = {email: email};
       return this.http.post('http://localhost:3000/api/admin/delete-user', dataid);
   }

   makeAdmin(email: string) {
       const dataid = {email: email};
       return this.http.post('http://localhost:3000/api/admin/admin-user', dataid);
   }

   rentedCars() {
        return this.http.get('http://localhost:3000/api/admin/rented-cars');
   }

   cancelRent(id: any, from: any, until: any) {
        const info = {id: id, from: from, until: until};
        return this.http.post('http://localhost:3000/api/admin/cancel-rent', info);
   }


}