import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

import {Car} from '../../create-car/car.model';

@Injectable()
export class AdminService {

    constructor(private http: HttpClient, private router: Router) {}

   createCar(brand: string, model: string, power: string, seats: number) {
       const carData: Car = {brand: brand, model: model, power: power, seats: seats};
       return this.http.post('http://localhost:3000/api/admin/create-car', carData);
   }

   getUsers() {
        return this.http.get('http://localhost:3000/api/admin/users');
   }
}