import { Component, OnInit } from '@angular/core';
import {AdminService} from '../auth/admin/admin.service';
import {NgForm} from '@angular/forms';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-create-car',
  templateUrl: './create-car.component.html',
  styleUrls: ['./create-car.component.css']
})
export class CreateCarComponent implements OnInit {

    selectedFile: File = null;
    fd = new FormData();

  constructor(private adminservice: AdminService, private http: HttpClient) { }

  ngOnInit() {
  }

  onCreate(form: NgForm) {
    const filename = this.selectedFile.name;
    this.adminservice.createCar(form.value.brand, form.value.model, form.value.power, form.value.seats).subscribe(res => console.log(res));
    form.resetForm();
  }

  onFileSelected(event) {
   this.selectedFile = <File>event.target.files[0];
      this.fd.append('file', this.selectedFile, this.selectedFile.name);
      this.http.post('http://localhost:3000/api/admin/save-image', this.fd).subscribe(res => console.log(res));

  }

}
