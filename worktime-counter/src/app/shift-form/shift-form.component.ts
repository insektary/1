import {Component, Input, OnInit} from '@angular/core';
import { Mask } from '@fagnerlima/ng-mask';
import { Store } from '@ngrx/store';
import {AppState} from '../state-managment/state/app.state';
import * as Actions from '../state-managment/actions/actions';

@Component({
  selector: 'app-shift-form',
  templateUrl: './shift-form.component.html',
  styleUrls: ['./shift-form.component.less']
})
export class ShiftFormComponent implements OnInit {
  @Input() shift;

  readonly timeMask: Mask = new Mask('00:00');

  start = '';
  end = '';

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.start = this.shift.start;
    this.end = this.shift.end;
  }

  deleteShift() {
    this.store.dispatch(new Actions.DeleteShift(this.shift.id));
  }

  onChange() {
    this.store.dispatch(new Actions.UpdateShift(this.shift.id, this.start, this.end));
    this.store.dispatch(new Actions.CheckShift(this.shift.id));
    this.store.dispatch(new Actions.CheckIntersection());
    this.store.dispatch(new Actions.CheckFormValid());
  }

}
