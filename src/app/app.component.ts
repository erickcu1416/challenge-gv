import { Utils } from './../utils/utils';
import { Component, ElementRef, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { IReminder } from 'src/interfaces/reminder.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'challenge';

  date = moment();
  time = { hour: 13, minute: 30 };
  reminder: IReminder = {
    city: '',
    title: '',
    day: '',
    color: 'primary',
  };

  daySelected;
  reminders: IReminder[] = [];
  items: IReminder[] = [];

  modal: NgbModalRef;
  editable = false;

  constructor(private modalService: NgbModal) {}

  open(content) {
    this.modal = this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
    });
  }

  edit(item, content) {
    this.reminder = item;
    this.time = this.reminder.time;
    this.editable = true;
    this.open(content);
  }

  onSaveReminder($event) {
    this.reminder = $event;
    if (this.editable) {
      const i = this.reminders.findIndex(
        (item) => item._id === this.reminder._id
      );
      this.reminders.splice(i, 1);
    }
    this.reminders.push({
      ...this.reminder,
      _id: new Date().getUTCMilliseconds(),
    });
    this.modal.close();
    this.reminder.city = '';
    this.reminder.title = '';
    this.renderTable();
    this.editable = false;
  }

  ngOnInit() {
    let dayFormatted = this.date.format('MM/DD/YYYY');
    this.daySelected = dayFormatted;
    this.reminder.day = dayFormatted;
    this.time = {
      hour: this.date.hours(),
      minute: this.date.minutes(),
    };
  }

  renderTable() {
    this.items = this.reminders.filter(
      (reminder) => reminder.day === this.daySelected
    );
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
    if (!day) {
      return;
    }
    this.time = {
      hour: this.date.hours(),
      minute: this.date.minutes(),
    };
    this.daySelected = day;
    this.reminder.day = day;
    this.renderTable();
  }
}
