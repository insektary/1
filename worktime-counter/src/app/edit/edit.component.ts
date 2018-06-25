import {Component, Input, Output, EventEmitter, DoCheck, OnInit} from '@angular/core';
import {Shift} from "../metadata.service";

@Component({
  selector: 'edit-form',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.less']
})
export class EditComponent implements DoCheck, OnInit {
  @Input() store;

  @Output() closeEditForm: EventEmitter<any> = new EventEmitter();
  @Output() submitChanges: EventEmitter<any> = new EventEmitter();

  isValid: boolean;
  localStore = [];

  ngOnInit() {
    this.localStore = [...this.store.shiftList];
  }

  onCloseEditForm() {
    this.closeEditForm.emit();
  }

  onSubmitChanges() {
    this.submitChanges.emit(this.localStore);
  }

  addShift() {
    this.localStore.push(new Shift('', '', 'default'));
  }

  deleteShift(item) {
    this.localStore = this.localStore.filter(({ id }) => id !== item.id);
  }

  timeToNumber(strTime) {
    const arr = strTime.split(':');

    return Number(arr[0] + arr[1]);
  }

  checkCrossValid() {
    this.localStore.forEach((shift) => shift.crossValid = true);

    this.localStore.forEach((shift) => {
      if (!shift.isValid) {

        return;
      }

      const firstStart = this.timeToNumber(shift.start);
      const firstEnd = this.timeToNumber(shift.end);

      this.localStore.forEach((secondShift) => {
        if (!secondShift.isValid || secondShift.id === shift.id) {

          return;
        }

        const secondStart = this.timeToNumber(secondShift.start);
        const secondEnd = this.timeToNumber(secondShift.end);

        if (firstStart <= secondEnd && firstEnd >= secondStart) {
          shift.crossValid = false;
          secondShift.crossValid = false;
        }
      });
    });
  }

  ngDoCheck() {
    // console.log('check');
    this.checkCrossValid();

    this.isValid = this.localStore.every(({ isValid, crossValid }) => (isValid && crossValid));
  }
}
