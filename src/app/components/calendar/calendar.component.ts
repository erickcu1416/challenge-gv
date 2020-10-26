import { IReminder } from './../../../interfaces/reminder.interface';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  date = moment();
  daysArr;
  @Input() reminders: IReminder[] = [];
  @Input() daySelected;

  @Output() onChangeDaySelected = new EventEmitter<string>();


  constructor() { }

  ngOnInit(): void {
    this.daysArr = this.createCalendar(this.date);
  }

  createCalendar(month) {
    let firstDay = moment(month).startOf('M');
    let days = Array.apply(null, { length: month.daysInMonth() })
      .map(Number.call, Number)
      .map((n) => {
        return moment(firstDay).add(n, 'd');
      });

    for (let n = 0; n < firstDay.weekday(); n++) {
      days.unshift(null);
    }
    return days;
  }

  nextMonth() {
    this.date.add(1, 'M');
    this.daysArr = this.createCalendar(this.date);
  }

  previousMonth() {
    this.date.subtract(1, 'M');
    this.daysArr = this.createCalendar(this.date);
  }

  remiderCheck(day) {
    if (!day) return false;
    let dayFormatted = day.format('MM/DD/YYYY');
    const exist = this.reminders.find(reminder => reminder.day === dayFormatted);
    if (exist) {
      return true;
    } else {
      return false;
    }
  }

  todayCheck(day) {
    if (!day) {
      return false;
    }
    return moment().format('L') === day.format('L');
  }

  isSelected(day) {
    if (!day) return false;
    let dayFormatted = day.format('MM/DD/YYYY');
    if (dayFormatted === this.daySelected) return true;

  }

  async selectedDate(day) {
    if (!day) { return; }
    let dayFormatted = day.format('MM/DD/YYYY');
    this.onChangeDaySelected.emit(dayFormatted);
  }

}
