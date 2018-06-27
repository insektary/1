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
