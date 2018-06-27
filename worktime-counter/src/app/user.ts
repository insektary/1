import {Shift} from "./shift";

export class User {
  shiftList: Shift[];
  editList: Shift[];
  user = {
    name: '',
    subname: '',
    patronymic: ''
  };

  constructor() {
    this.shiftList = [];
    this.editList = [];
    this.user.name = 'Константин';
    this.user.subname = 'Константинопольский';
    this.user.patronymic = 'Константинович';
  }

  addShift() {
    this.editList.push(new Shift('', '', 'default'));
  }

  submitChanges() {
    this.shiftList = this.editList;
  }

  deleteShift(item) {
    this.editList = this.editList.filter(({ id }) => id !== item.id);
  }

}
