import { Action } from '@ngrx/store';

export enum ActionTypes {
  ADD_TODO = 'ADD_TODO',
  DELETE_TODO = 'DELETE_TODO',
  CHANGE_STATUS = 'CHANGE_STATUS',
  UNLOCK_TODO = 'UNLOCK_TODO',
  REWRITE_TODO = 'REWRITE_TODO',
  CLEAR_COMPLETED = 'CLEAR_COMPLETED',
  CHECK_ALL = 'CHECK_ALL',
  CHANGE_FILTER = 'CHANGE_FILTER'
}

export class AddTodo implements Action {
  readonly type = ActionTypes.ADD_TODO;
  readonly title: string;

  constructor(title: string) {
    this.title = title;
  }
}

export class DeleteTodo implements Action {
  readonly type = ActionTypes.DELETE_TODO;
  readonly id: string;

  constructor(id: string) {
    this.id = id;
  }
}

export class ChangeStatus implements Action {
  readonly type = ActionTypes.CHANGE_STATUS;
  readonly id: string;

  constructor(id: string) {
    this.id = id;
  }
}

export class UnlockTodo implements Action {
  readonly type = ActionTypes.UNLOCK_TODO;
  readonly id: string;

  constructor(id: string) {
    this.id = id;
  }
}

export class RewriteTodo implements Action {
  readonly type = ActionTypes.REWRITE_TODO;
  readonly id: string;
  readonly title: string;

  constructor(id: string, title: string) {
    this.id = id;
    this.title = title;
  }
}

export class ClearCompleted implements Action {
  readonly type = ActionTypes.CLEAR_COMPLETED;
}

export class CheckAll implements Action {
  readonly type = ActionTypes.CHECK_ALL;
}

export class ChangeFilter implements Action {
  readonly type = ActionTypes.CHANGE_FILTER;
  readonly id: string;

  constructor(id: string) {
    this.id = id;
  }
}

export type Actions =
  | AddTodo
  | DeleteTodo
  | ChangeStatus
  | UnlockTodo
  | RewriteTodo
  | ClearCompleted
  | CheckAll
  | ChangeFilter;
