import {Shift} from './shift';

export class User {
  shiftList: Shift[];
  editList: Shift[];
  user: Object;
  formValid: boolean;

  constructor(name: string, subname: string, patronymic: string) {
    this.shiftList = [];
    this.editList = [];
    this.formValid = false;
    this.user = {
      name,
      subname,
      patronymic
    };
  }
}

export const initialUserState: User = new User('Константин', 'Константинович', 'Константинопольский');
