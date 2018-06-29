import {Component, DoCheck, OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import {AppState} from '../state-managment/state/app.state';
import * as Actions from '../state-managment/actions/actions';
import {Observable} from 'rxjs/internal/Observable';
import {User} from '../state-managment/state/user';
import {select} from '@ngrx/store';


@Component({
  selector: 'edit-form',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.less']
})
export class EditComponent implements DoCheck, OnInit {
  user$: Observable<User>;

  // isValid: boolean;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.user$ = this.store.pipe(select('user'));
  }

  onCloseEditForm() {
    this.store.dispatch(new Actions.ChangeEditMode());
  }

  addShift() {
    this.store.dispatch(new Actions.AddShift());
  }

  submitChanges() {
    this.store.dispatch(new Actions.SubmitChanges());
    this.store.dispatch(new Actions.ChangeEditMode());
  }

  ngDoCheck() {
    // this.dataWasChanged.emit();

    // this.isValid = this.store.editList.every(({ isValid, crossValid }) => (isValid && crossValid));
  }
}
