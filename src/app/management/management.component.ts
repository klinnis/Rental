import {Component, OnInit, ViewChild} from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {MatPaginator, MatTable, MatTableDataSource} from '@angular/material';
import {AdminService} from '../auth/admin/admin.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit {

    displayedColumns = ['car_id', 'reserved_from', 'reserved_till', 'cancel'];
    dataSource = new MatTableDataSource();
    cars: any;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild('table') table: MatTable<any>;

  constructor(private adminservice: AdminService) { }

  ngOnInit() {
      this.adminservice.rentedCars().subscribe(res => {
          const ELEMENT_DATA = [];
          this.cars = res;
          this.cars.forEach(car => {
              const id = car.car_id;
              const from = car.fromDate;
              const until = car.untilDate;
              ELEMENT_DATA.push({car_id: id, fromDate: from, untilDate: until});
          });
          this.dataSource.data = ELEMENT_DATA;
          this.dataSource.paginator = this.paginator;
      });

  }

    onCancel(element: any) {
        this.adminservice.cancelRent(element.car_id, element.fromDate, element.untilDate).subscribe(res =>
            this.adminservice.rentedCars().subscribe(res3 => {
                const ELEMENT_DATA = [];
                this.cars = res3;
                this.cars.forEach(car => {
                    const id = car.car_id;
                    const from = car.fromDate;
                    const until = car.untilDate;
                    ELEMENT_DATA.push({car_id: id, fromDate: from, untilDate: until});
                });
                this.dataSource.data = ELEMENT_DATA;
                this.dataSource.paginator = this.paginator;
            }));

    }

}



