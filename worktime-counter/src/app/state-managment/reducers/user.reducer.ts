import {ActionTypes, Actions} from '../actions/actions';
import {User, initialUserState} from '../state/user';
import {Shift} from '../state/shift';

export const userReducer = (state = initialUserState, action: Actions): User => {
  const newObj = Object.assign({}, state);

  switch (action.type) {
    case ActionTypes.ADD_SHIFT:
      newObj.editList = [...newObj.editList, new Shift()];

      return newObj;
    case ActionTypes.DELETE_SHIFT:
      newObj.editList = newObj.editList.filter(({ id }) => id !== action.id);

      return newObj;
    case ActionTypes.CHANGE_TYPE:
      console.log('type change');

      return newObj;
    case ActionTypes.CHECK_SHIFT:
      console.log('shift check');

      return newObj;
    case ActionTypes.CHECK_INTERSECTION:
      console.log('intersection check');

      return newObj;
    case ActionTypes.SUBMIT_CHANGES:
      newObj.shiftList = [...newObj.editList];

      return newObj;
    case ActionTypes.UPDATE_SHIFT:
      newObj.editList.forEach((shift) => {
        if (shift.id === action.id) {
          shift.start = action.start;
          shift.end = action.end;
        }
      });

      return newObj;
    default:
      return state;
  }
};
