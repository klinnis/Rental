import {Component, OnInit, ViewChild} from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {MatPaginator, MatTable} from '@angular/material';
import {AdminService} from '../auth/admin/admin.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit {

    displayedColumns = ['car_id', 'reserved_from', 'reserved_till', 'cancel'];
    dataSource = new UserDataSource(this.adminservice);

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild('table') table: MatTable<any>;

  constructor(private adminservice: AdminService) { }

  ngOnInit() {
  }

    onCancel(element: any) {
        this.adminservice.cancelRent(element.car_id, element.fromDate, element.untilDate).subscribe(res =>
            this.dataSource = new UserDataSource(this.adminservice));

    }

}


export class UserDataSource extends DataSource<any> {
    constructor(private adminservice: AdminService) {
        super();
    }
    connect(): Observable<any> {
        return this.adminservice.rentedCars();
    }
    disconnect() {}
}
