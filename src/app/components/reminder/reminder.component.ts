import { IReminder } from 'src/interfaces/reminder.interface';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.scss'],
})
export class ReminderComponent implements OnInit {
  @Output() addReminderEmitter = new EventEmitter<string>();
  @Output() deleteAllRemindersByDayEmitter = new EventEmitter<string>();
  @Output() editReminderEmitter = new EventEmitter<string>();

  @Input() items: IReminder[] = [];

  constructor() {}

  ngOnInit(): void {}

  addReminder() {
    this.addReminderEmitter.emit();
  }

  deleteAllRemindersByDay() {
    this.deleteAllRemindersByDayEmitter.emit();
  }

  editReminder(item) {
    this.editReminderEmitter.emit(item);
  }
}
