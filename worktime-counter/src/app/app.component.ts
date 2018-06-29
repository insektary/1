import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {User} from './state-managment/state/user';
import { Store } from '@ngrx/store';
import {AppState} from './state-managment/state/app.state';
import {select} from '@ngrx/store';
import {EditMode} from './state-managment/state/edit-mode';
import * as Actions from './state-managment/actions/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  user$: Observable<User>;
  editMode$: Observable<EditMode>;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.user$ = this.store.pipe(select('user'));
    this.editMode$ = this.store.pipe(select('edit-mode'));
  }

  changeMode() {
    this.store.dispatch(new Actions.ChangeEditMode());
  }

  timeToNumber(strTime) {
    // const arr = strTime.split(':');

    // return Number(arr[0] + arr[1]);
  }

  checkCrossValid() {
    // this.store.editList.forEach((shift) => shift.crossValid = true);
    //
    // this.store.editList.forEach(({ isValid, start, end, id, crossValid }) => {
    //   if (!isValid) {
    //
    //     return;
    //   }
    //
    //   const firstStart = this.timeToNumber(start);
    //   const firstEnd = this.timeToNumber(end);
    //
    //   this.store.editList.forEach((secondShift) => {
    //     if (!secondShift.isValid || secondShift.id === id) {
    //
    //       return;
    //     }
    //
    //     const secondStart = this.timeToNumber(secondShift.start);
    //     const secondEnd = this.timeToNumber(secondShift.end);
    //
    //     if (firstStart <= secondEnd && firstEnd >= secondStart) {
    //       crossValid = false;
    //       secondShift.crossValid = false;
    //     }
    //   });
    // });
  }

}
