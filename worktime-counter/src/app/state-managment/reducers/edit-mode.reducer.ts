import {ActionTypes, Actions} from '../actions/actions';
import {EditMode, initialEditModeState} from '../state/edit-mode';

export const editModeReducer = (state = initialEditModeState, action: Actions): EditMode => {
  switch (action.type) {
    case ActionTypes.CHANGE_EDITMODE:
      return !state;
    default:
      return state;
  }
};
