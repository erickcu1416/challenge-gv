import { Utils } from './../utils/utils';
import { Component, ElementRef, ViewChild } from '@angular/core';
import * as moment from 'moment';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { IReminder } from 'src/interfaces/reminder.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent {
  title = 'challenge';

  date = moment();
  time = {hour: 13, minute: 30};
  reminder: IReminder = {
    city: '',
    title: '',
    day: '',
    color: 'primary'
  };

  daysArr;
  daysSelected = [];
  daySelected;
  reminders: IReminder[] = [];
  items: IReminder[] = [];

  modal: NgbModalRef;
  editable = false;

  constructor(private modalService: NgbModal) {}

  open(content) {
    this.modal = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    this.modal.result.then((result) => {
      const res = `Closed with: ${result}`;
    });
  }

  edit(item, content) {
    this.reminder = item;
    this.time = this.reminder.time;
    this.editable = true;
    this.open(content);
  }

  saveReminder() {
    const errorMessage = 'Por favor, completa todos los campos para continuar';
    console.log(this.time);
    if (!this.time) {
      return alert(errorMessage);
    }

    // tslint:disable-next-line: forin
    for (const key in this.reminder) {
      if (this.reminder[key] === '') { return alert(errorMessage); }
      if (this.reminder[key].length > 30) { return alert(`El maximo de carecteres para ${key} es 30`); }
    }

    console.log(this.reminder);
    if (this.editable) {
      const i = this.reminders.findIndex(item => item._id === this.reminder._id);
      this.reminders.splice(i, 1);
    }
    this.reminders.push({...this.reminder, time: this.time, color: this.reminder.color, _id: new Date().getUTCMilliseconds()});
    console.log('Recordatios', this.reminders);
    this.modal.close();
    this.reminder.city = '';
    this.reminder.title = '';
    this.renderTable();
    this.editable = false;

  }

  ngOnInit() {
    this.daysArr = this.createCalendar(this.date);
    let dayFormatted = this.date.format('MM/DD/YYYY');
    this.daySelected = dayFormatted;
    this.reminder.day = dayFormatted;
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

  renderTable() {
    this.items = this.reminders.filter((reminder) => reminder.day === this.daySelected);
    this.items.sort(Utils.compare);
  }

  deleteAllRemindersByDay() {
    let newReminders = [];

    for (const reminder of this.reminders) {
      if (reminder.day !== this.daySelected) {
        newReminders.push(reminder);
      }
    }

    this.reminders = newReminders;
    this.renderTable();
  }

  async selectedDate(day) {
    this.time = {
      hour: this.date.hours(),
      minute: this.date.minutes(),
    };
    if (!day) { return; }
    let dayFormatted = day.format('MM/DD/YYYY');
    this.daySelected = dayFormatted;
    this.reminder.day = dayFormatted;
    this.renderTable();
  }
}
