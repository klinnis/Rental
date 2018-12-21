import { Component, OnInit } from '@angular/core';
import {CarsService} from './cars.service';
import * as moment from 'moment';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})


export class CarsComponent implements OnInit {

    car: any;
    path: any;
    temp: any;


    constructor(private carservice: CarsService) {
    }

    ngOnInit() {
        this.carservice.selecteCars.subscribe(res =>
        {
            this.car = res;
            console.log(res);
        });
    }

    onRent(cars) {
   const from = localStorage.getItem('from');
   const until = localStorage.getItem('until');
   const from1 = moment(from).format('YYYYMMDD');
   const unti = moment(until).format('YYYYMMDD');

   this.carservice.rentCar(cars._id, from1, unti).subscribe(res => {
       console.log(res);
   });


    }


}
