import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {AdminService} from '../admin.service';

export interface PeriodicElement {
    email: string;
    isAdmin: number;

}




@Component({
    templateUrl: './admin-users.component.html',
    styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {

    ELEMENT_DATA: PeriodicElement[] = [
        {isAdmin: 1, email: 'Hydrogen'},
        {isAdmin: 2, email: 'Helium'},

    ];

    constructor(private adminservice: AdminService) {}

    displayedColumns: string[] = ['email', 'isAdmin', 'edit'];
    dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);


    @ViewChild(MatPaginator) paginator: MatPaginator;


    ngOnInit() {
        this.dataSource.paginator = this.paginator;
        this.adminservice.getUsers().subscribe(res => console.log(res));
    }

    getting(element: any) {
        console.log(element.name);
    }

}