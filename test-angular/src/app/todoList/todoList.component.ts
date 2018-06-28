import {Component, OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import {AppState} from '../state-managment/state/app.state';
import {Observable} from 'rxjs/internal/Observable';
import {select} from '@ngrx/store';
import {TodoList} from '../state-managment/state/todo-list.state';
import {ChosenFilter} from '../state-managment/state/chosen-filter.state';
import * as Actions from '../state-managment/actions/actions';

@Component({
  selector: 'app-todolist',
  templateUrl: './todoList.component.html',
  styleUrls: ['./todoList.component.less']
})
export class TodoListComponent implements OnInit {
  list$: Observable<TodoList>;
  filter$: Observable<ChosenFilter>;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.list$ = this.store.pipe(select('todo-list'));
    this.filter$ = this.store.pipe(select('chosen-filter'));
  }

  addTodo(value) {
    this.store.dispatch(new Actions.AddTodo(value));
  }

  deleteTodo({ id }) {
    this.store.dispatch(new Actions.DeleteTodo(id));
  }

  unlockTodo({ id }) {
    this.store.dispatch(new Actions.UnlockTodo(id));
  }

  rewriteTodo({ id, title }) {
    this.store.dispatch(new Actions.RewriteTodo(id, title));
  }

  changeStatus({ id }) {
    this.store.dispatch(new Actions.ChangeStatus(id));
  }

  checkAll() {
    this.store.dispatch(new Actions.CheckAll());
  }

  changeFilter({ target: { id }}) {
    this.store.dispatch(new Actions.ChangeFilter(id));
  }

  clearCompleted() {
    this.store.dispatch(new Actions.ClearCompleted());
  }

}
