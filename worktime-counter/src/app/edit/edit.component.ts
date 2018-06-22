import {Component, Input, Output, EventEmitter, DoCheck} from '@angular/core';

@Component({
  selector: 'edit-form',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.less']
})
export class EditComponent implements DoCheck{
  @Input() store;

  @Output() closeEditForm: EventEmitter<any> = new EventEmitter();
  @Output() addShift: EventEmitter<any> = new EventEmitter();

  isValid: boolean = false;

  onCloseEditForm() {
    this.closeEditForm.emit();
  }

  onAddShift() {
    this.addShift.emit();
  }

  ngDoCheck() {
    this.isValid = (this.store.shiftList.every(({ isValid }) => isValid) && this.store.shiftList.length);
  }
}
