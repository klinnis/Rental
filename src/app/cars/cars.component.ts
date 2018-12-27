import {Component, Inject, OnInit} from '@angular/core';
import {CarsService} from './cars.service';
import * as moment from 'moment';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';





@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})


export class CarsComponent implements OnInit {

    car: any;
    path: any;
    temp: any;
    admin: any;


    constructor(private carservice: CarsService, public dialog: MatDialog) {
    }

    ngOnInit() {
        this.admin = localStorage.getItem('admin');
        this.carservice.isAdmin.next(this.admin);
        this.carservice.selecteCars.subscribe(res => {
            this.car = res;
            this.path = this.carservice.path;
        });
    }

    onRent(cars) {
        const from = localStorage.getItem('from');
        const until = localStorage.getItem('until');
        const from1 = moment(from).format('YYYYMMDD');
        const unti = moment(until).format('YYYYMMDD');
        const fromDate = moment(from).format('YYYY-MM-DD');
        const untilDate = moment(until).format('YYYY-MM-DD');

        this.carservice.rentCar(cars._id, from1, unti, fromDate, untilDate).subscribe(res => {
            console.log(res);
        });

        const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
            width: '300px',
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
        });


    }

}




@Component({
    selector: 'app-dialog-overview-example-dialog',
    templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {

    constructor(
        public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
        @Inject(MAT_DIALOG_DATA) public data: {}) {}

    onNoClick(): void {
        this.dialogRef.close();
    }

}
