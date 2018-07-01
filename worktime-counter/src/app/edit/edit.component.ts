import {Component, DoCheck, OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import {AppState} from '../state-managment/state/app.state';
import * as Actions from '../state-managment/actions/actions';
import {Observable} from 'rxjs/internal/Observable';
import {User} from '../state-managment/state/user';
import {select} from '@ngrx/store';


@Component({
  selector: 'app-edit-form',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.less']
})
export class EditComponent implements OnInit {
  user$: Observable<User>;

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

}
