import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTable, MatTableDataSource} from '@angular/material';
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
    dataSource = new MatTableDataSource();
    users: any;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild('table') table: MatTable<any>;


    constructor(private adminservice: AdminService) {}

    ngOnInit() {
        this.adminservice.getUsers().subscribe(res => {
            const ELEMENT_DATA = [];
            this.users = res;
            this.users.forEach(user => {
                const email = user.email;
                const isAdmin = user.isAdmin;

                ELEMENT_DATA.push({email: email, isAdmin: isAdmin});
            });
            this.dataSource.data = ELEMENT_DATA;
            this.dataSource.paginator = this.paginator;
        });

    }

    onDelete(element: any) {
      this.adminservice.deleteUser(element.email).subscribe(res => {

          const ELEMENT_DATA = [];
          this.users = res;
          this.users.forEach(car => {
              const email = car.email;
              const isAdmin = car.isAdmin;
              ELEMENT_DATA.push({email: email, isAdmin: isAdmin});
          });
          this.dataSource.data = ELEMENT_DATA;
          this.dataSource.paginator = this.paginator;


      });

    }

    onAdmin(element: any) {
        this.adminservice.makeAdmin(element.email).subscribe(res => {
                const ELEMENT_DATA = [];
                this.users = res;
                this.users.forEach(car => {
                    const email = car.email;
                    const isAdmin = car.isAdmin;
                    ELEMENT_DATA.push({email: email, isAdmin: isAdmin});
                });
                this.dataSource.data = ELEMENT_DATA;
                this.dataSource.paginator = this.paginator;
            });

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


