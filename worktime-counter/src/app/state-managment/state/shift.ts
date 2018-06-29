export class Shift {
  start: string;
  end: string;
  id: string;
  shiftType: string;
  isValid: boolean = false;
  intersectionValid: boolean = true;

  private generateID(): string {
    return new Date().getTime().toString().substr(5);
  }

  constructor() {
    this.start = '';
    this.end = '';
    this.shiftType = 'first';
    this.id = this.generateID();
  }
}
