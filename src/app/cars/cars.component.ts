import { Component, OnInit } from '@angular/core';
import {CarsService} from './cars.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})


export class CarsComponent implements OnInit {

  car: any;
  path: any;


  constructor(private carservice: CarsService) { }

  ngOnInit() {
    this.carservice.getCars().subscribe(res => {
     this.path = 'uploads/';
      this.car = res;
    });
  }

}
