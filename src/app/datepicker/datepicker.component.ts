import {Component, OnDestroy} from '@angular/core';
import {NgForm} from '@angular/forms';
import * as moment from 'moment';
import {CarsService} from '../cars/cars.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';




@Component({
    selector: 'app-date-picker',
    templateUrl: './datepicker.component.html',
    styleUrls: ['./datepicker.component.css'],
})
export class DatePickerComponent implements OnDestroy {

    private ngUnsubscribe: Subject<any> = new Subject();

    constructor(private carsService: CarsService) {}


    onSearch(form: NgForm) {
        const temp0 = form.value.dateInput[0];
        const temp1 = form.value.dateInput[1];
        const from = moment(temp0).format('YYYYMMDD');
        const until = moment(temp1).format('YYYYMMDD');
        localStorage.setItem('from', from);
        localStorage.setItem('until', until);
         const apo = localStorage.getItem('from');
        const ews = localStorage.getItem('until');
        this.carsService.getCars(apo, ews).subscribe(res => this.carsService.selecteCars.next(res));


    }

    ngOnDestroy(): any {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

}