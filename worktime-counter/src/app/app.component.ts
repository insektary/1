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

}
