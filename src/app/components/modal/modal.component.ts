import { IReminder } from './../../../interfaces/reminder.interface';
import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  editable = false;
  @Input() time = {hour: 13, minute: 30};
  @Input() reminder: IReminder = {
    city: '',
    title: '',
    day: '',
    color: 'primary'
  };

  @Output() onCloseModal = new EventEmitter<string>();
  @Output() onSaveReminder = new EventEmitter<IReminder>();

  constructor() { }

  ngOnInit(): void {
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

    this.reminder.time = this.time;
    console.log(this.reminder);
    this.onSaveReminder.emit(this.reminder);
  }

  onClose() {
    this.onCloseModal.emit();
  }

}
