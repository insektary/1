import { Injectable } from '@angular/core';

class Shift {
  start = '';
  end = '';
  id: string;
  shiftType: string;
  isValid: boolean = false;
  crossValid: boolean = true;

  private generateID(): string {
    return new Date().getTime().toString().substr(5);
  }

  constructor(start: string, end: string, shiftType: string) {
    this.start = start;
    this.end = end;
    this.shiftType = shiftType;
    this.id = this.generateID();
  }
}

@Injectable({
  providedIn: 'root'
})
export class MetadataService {
  shiftList: Shift[];
  user = {
    name: '',
    subname: '',
    patronymic: ''
  };

  constructor() {
    this.shiftList = [];
    this.user.name = 'Константин';
    this.user.subname = 'Константинопольский';
    this.user.patronymic = 'Константинович';
  }

  addShift() {
    this.shiftList.push(new Shift('', '', 'default'));
  }

  deleteShift(item) {
    this.shiftList = this.shiftList.filter(({ id }) => id !== item.id);
  }

  timeToNumber(strTime) {
    const arr = strTime.split(':');

    return Number(arr[0] + arr[1]);
  }

  checkCrossValid() {
    this.shiftList.forEach((shift) => shift.crossValid = true);

    this.shiftList.forEach((shift) => {
      if (!shift.isValid) return;

      const firstStart = this.timeToNumber(shift.start);
      const firstEnd = this.timeToNumber(shift.end);

      this.shiftList.forEach((secondShift) => {
        if (!secondShift.isValid || secondShift.id === shift.id) return;

        const secondStart = this.timeToNumber(secondShift.start);
        const secondEnd = this.timeToNumber(secondShift.end);

        if (firstStart <= secondEnd && firstEnd >= secondStart) {
          shift.crossValid = false;
          secondShift.crossValid = false;
        }
      })
    })
  }
}
