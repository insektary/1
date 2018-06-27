import {Component, Input, Output, EventEmitter, DoCheck, OnInit} from '@angular/core';

@Component({
  selector: 'edit-form',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.less']
})
export class EditComponent implements DoCheck {
  @Input() store;

  @Output() closeEditForm: EventEmitter<void> = new EventEmitter();
  @Output() submitChanges: EventEmitter<void> = new EventEmitter();
  @Output() dataWasChanged: EventEmitter<void> = new EventEmitter();

  isValid: boolean;

  onCloseEditForm() {
    this.closeEditForm.emit();
  }

  onSubmitChanges() {
    this.submitChanges.emit();
  }

  addShift() {
    this.store.addShift();
  }

  deleteShift(item) {
    this.store.deleteShift(item);
  }

  ngDoCheck() {
    this.dataWasChanged.emit();

    this.isValid = this.store.editList.every(({ isValid, crossValid }) => (isValid && crossValid));
  }
}
