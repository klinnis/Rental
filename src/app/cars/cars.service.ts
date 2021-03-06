import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable()
export class CarsService {

    dateFrom = new Subject();
    dateUntil = new Subject();
    selecteCars = new Subject();
    path = 'uploads/';
    isAdmin = new Subject();


    constructor(private http: HttpClient) {}


    getCars(from: any, until: any) {
        const cars = {from: from, until: until};
        return this.http.post('http://localhost:3000/api/admin/cars', cars);

    }

    rentCar(id: any, from: any, until: any, fromDate: any, untilDate: any) {
        const info = {id: id, from: from, until: until, fromDate: fromDate, untilDate: untilDate};
        return this.http.post('http://localhost:3000/api/admin/rent', info);
    }


}