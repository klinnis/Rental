import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTable} from '@angular/material';
import {AdminService} from '../admin.service';
import {Observable} from 'rxjs';
import {DataSource} from '@angular/cdk/collections';

export interface User {
    email: string;
    isAdmin: number;
}

@Component({
    templateUrl: './admin-users.component.html',
    styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {

    displayedColumns = ['email', 'isAdmin', 'edit'];
    dataSource = new UserDataSource(this.adminservice);

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild('table') table: MatTable<any>;


    constructor(private adminservice: AdminService) {}

    ngOnInit() {


    }

    onDelete(element: any) {
      this.adminservice.deleteUser(element._id).subscribe(res =>
          this.dataSource = new UserDataSource(this.adminservice));

    }

    onAdmin(element: any) {
        this.adminservice.makeAdmin(element._id).subscribe(res =>
            this.dataSource = new UserDataSource(this.adminservice));
    }



}

export class UserDataSource extends DataSource<any> {
    constructor(private adminservice: AdminService) {
        super();
    }
    connect(): Observable<any> {
        return this.adminservice.getUsers();
    }
    disconnect() {}
}


