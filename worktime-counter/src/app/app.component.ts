import {Component, OnInit} from '@angular/core';
import { DataService } from './data.service';
import {User} from "./user";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  store: User;
  editMode = false;

  constructor(private _dataService: DataService) {}

  ngOnInit() {
    this.getShiftList();
  }

  getShiftList() {
    this.store = this._dataService.getUser();
  }

  changeMode() {
    this.editMode = true;
  }

  closeEditForm() {
    this.editMode = false;
  }

  submitChanges() {
    this.store.submitChanges();

    this.editMode = false;
  }

  timeToNumber(strTime) {
    const arr = strTime.split(':');

    return Number(arr[0] + arr[1]);
  }

  checkCrossValid() {
    this.store.editList.forEach((shift) => shift.crossValid = true);

    this.store.editList.forEach(({ isValid, start, end, id, crossValid }) => {
      if (!isValid) {

        return;
      }

      const firstStart = this.timeToNumber(start);
      const firstEnd = this.timeToNumber(end);

      this.store.editList.forEach((secondShift) => {
        if (!secondShift.isValid || secondShift.id === id) {

          return;
        }

        const secondStart = this.timeToNumber(secondShift.start);
        const secondEnd = this.timeToNumber(secondShift.end);

        if (firstStart <= secondEnd && firstEnd >= secondStart) {
          crossValid = false;
          secondShift.crossValid = false;
        }
      });
    });
  }

}
