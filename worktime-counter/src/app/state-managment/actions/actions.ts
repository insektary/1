import { Action } from '@ngrx/store';

export enum ActionTypes {
  ADD_SHIFT = 'ADD_SHIFT',
  DELETE_SHIFT = 'DELETE_SHIFT',
  CHANGE_TYPE = 'CHANGE_TYPE',
  CHECK_SHIFT = 'CHECK_SHIFT',
  CHECK_INTERSECTION = 'CHECK_INTERSECTION',
  CHANGE_EDITMODE = 'CHANGE_EDITMODE',
  SUBMIT_CHANGES = 'SUBMIT_CHANGES',
  UPDATE_SHIFT = 'UPDATE_SHIFT'
}

export class AddShift implements Action {
  readonly type = ActionTypes.ADD_SHIFT;
}

export class DeleteShift implements Action {
  readonly type = ActionTypes.DELETE_SHIFT;
  readonly id: string;

  constructor(id: string) {
    this.id = id;
  }
}

export class ChangeType implements Action {
  readonly type = ActionTypes.CHANGE_TYPE;
  readonly id: string;
  readonly shiftType: string;

  constructor(id: string, shiftType: string) {
    this.id = id;
    this.shiftType = shiftType;
  }
}

export class CheckShift implements Action {
  readonly type = ActionTypes.CHECK_SHIFT;
  readonly id: string;

  constructor(id: string) {
    this.id = id;
  }
}

export class CheckIntersection implements Action {
  readonly type = ActionTypes.CHECK_INTERSECTION;
}

export class ChangeEditMode implements Action {
  readonly type = ActionTypes.CHANGE_EDITMODE;
}

export class SubmitChanges implements Action {
  readonly type = ActionTypes.SUBMIT_CHANGES;
}

export class UpdateShift implements Action {
  readonly type = ActionTypes.UPDATE_SHIFT;
  readonly id: string;
  readonly start: string;
  readonly end: string;

  constructor(id: string, start: string, end: string) {
    this.start = start;
    this.end = end;
    this.id = id;
  }
}

export type Actions =
  | AddShift
  | DeleteShift
  | ChangeType
  | CheckShift
  | CheckIntersection
  | ChangeEditMode
  | SubmitChanges
  | UpdateShift;
