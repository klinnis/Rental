import { Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import * as moment from 'moment';




@Component({
    selector: 'app-date-picker',
    templateUrl: './datepicker.component.html',
    styleUrls: ['./datepicker.component.css'],
})
export class DatePickerComponent  {



    onSearch(form: NgForm) {
        const temp0 = form.value.dateInput[0];
        const temp1 = form.value.dateInput[1];
        const from = moment(temp0).format('DD-MM-YYYY');
        const until = moment(temp1).format('DD-MM-YYYY');
        console.log(from);
        console.log(until);
    }

}