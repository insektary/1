import {Component, Input, DoCheck, OnChanges} from '@angular/core';
import { Mask } from '@fagnerlima/ng-mask';
import { Store } from '@ngrx/store';
import {AppState} from '../state-managment/state/app.state';
import * as Actions from '../state-managment/actions/actions';

@Component({
  selector: 'shift-form',
  templateUrl: './shift-form.component.html',
  styleUrls: ['./shift-form.component.less']
})
export class ShiftForm {
  @Input() shift;

  readonly timeMask: Mask = new Mask('00:00');

  start: string;
  end: string;

  constructor(private store: Store<AppState>) {}

  deleteShift() {
    this.store.dispatch(new Actions.DeleteShift(this.shift.id));
  }


  checkOnCorrectly({start, end}) {
    //
    // const arrStart = start.split(':');
    // const arrEnd = end.split(':');
    //
    // if ((start.length === 5 && end.length === 5)
    //   && (Number(arrEnd[0]) < 24 && Number(arrStart[0]) < 24)
    //   && (Number(arrEnd[1]) < 60 && Number(arrStart[0]) < 60)
    //   && (Number(arrEnd[0] + arrEnd[1]) > Number(arrStart[0] + arrStart[1]))) {
    //   return true;
    // } else {
    //   return false;
    // }
  }

  onChange() {
    this.store.dispatch(new Actions.UpdateShift(this.shift.id, this.start, this.end));
  }

}
