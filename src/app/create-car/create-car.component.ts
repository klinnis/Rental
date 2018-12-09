import { Component, OnInit } from '@angular/core';
import {AdminService} from '../auth/admin/admin.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-create-car',
  templateUrl: './create-car.component.html',
  styleUrls: ['./create-car.component.css']
})
export class CreateCarComponent implements OnInit {

  constructor(private adminservice: AdminService) { }

  ngOnInit() {
  }

  onCreate(form: NgForm) {
    this.adminservice.createCar(form.value.brand, form.value.model, form.value.power, form.value.seats).subscribe(res => console.log(res));
    form.resetForm();
  }

}
