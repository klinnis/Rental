import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';

@Injectable()
export class CarsService {

    dateFrom = new Subject();
    dateUntil = new Subject();
    selecteCars = new Subject();

    constructor(private http: HttpClient) {}

    getCars(from: any, until: any) {
        const cars = {from: from, until: until};
        return this.http.post('http://localhost:3000/api/admin/cars', cars);

    }

    rentCar(id: any, from: any, until: any) {
        const info = {id: id, from: from, until: until};
        return this.http.post('http://localhost:3000/api/admin/rent', info);
    }


}