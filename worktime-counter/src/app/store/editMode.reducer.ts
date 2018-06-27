import {Action} from "@ngrx/store";

export function editModeReducer(state: boolean = false, action: Action) {
  switch (action.type) {
    case 'SET_EDIT':
      return true;
    case 'SET_MAIN':
      return false;
    default:
      return state;
  }
}
