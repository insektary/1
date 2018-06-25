import {Component, Input, EventEmitter, Output, DoCheck} from '@angular/core';
import { Mask } from '@fagnerlima/ng-mask';

@Component({
  selector: 'shift-form',
  templateUrl: './shift-form.component.html',
  styleUrls: ['./shift-form.component.less']
})
export class ShiftForm implements DoCheck {
  @Input() item;

  @Output() deleteShift: EventEmitter<any> = new EventEmitter();

  readonly timeMask: Mask = new Mask('00:00');

  onDeleteShift() {
    this.deleteShift.emit();
  }

  ngDoCheck() {

    // console.log('check');
    const start = this.item.start.split(':');
    const end = this.item.end.split(':');

    if ((this.item.start.length === 5 && this.item.end.length === 5)
      && (Number(end[0]) < 24 && Number(start[0]) < 24)
      && (Number(end[1]) < 60 && Number(start[0]) < 60)
      && (Number(end[0] + end[1]) > Number(start[0] + start[1]))) {
        this.item.isValid = true;
    } else {
      this.item.isValid = false;
    }
  }

}
