import { Injectable } from '@angular/core';

export class Shift {
  start = '';
  end = '';
  id: string;
  shiftType: string;
  isValid = false;
  crossValid = true;

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

  submitChanges(localStore) {
    this.shiftList = localStore;
  }

}
