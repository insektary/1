import {Component, Input, EventEmitter, Output, DoCheck} from '@angular/core';
import { Mask } from '@fagnerlima/ng-mask';

@Component({
  selector: 'shift-form',
  templateUrl: './shift-form.component.html',
  styleUrls: ['./shift-form.component.less']
})
export class ShiftForm implements DoCheck {
  @Input() item;

  @Output() deleteShift: EventEmitter<void> = new EventEmitter();

  readonly timeMask: Mask = new Mask('00:00');

  onDeleteShift() {
    this.deleteShift.emit();
  }

  checkOnCorrectly({start, end}) {

    const arrStart = start.split(':');
    const arrEnd = end.split(':');

    if ((start.length === 5 && end.length === 5)
      && (Number(arrEnd[0]) < 24 && Number(arrStart[0]) < 24)
      && (Number(arrEnd[1]) < 60 && Number(arrStart[0]) < 60)
      && (Number(arrEnd[0] + arrEnd[1]) > Number(arrStart[0] + arrStart[1]))) {
      return true;
    } else {
      return false;
    }
  }

  ngDoCheck() {
    this.item.isValid = this.checkOnCorrectly(this.item);
  }

}
