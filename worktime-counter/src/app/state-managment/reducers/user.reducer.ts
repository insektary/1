import {ActionTypes, Actions} from '../actions/actions';
import {User, initialUserState} from '../state/user';
import {Shift} from '../state/shift';

const timeToNumber = (strTime) => {
  const arr = strTime.split(':');

  return Number(arr[0] + arr[1]);
};

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
      console.log('type change'); // todo

      return newObj;
    case ActionTypes.CHECK_SHIFT:
      const checkedShift = newObj.editList.find(({ id }) => id === action.id);
      const arrStart = checkedShift.start.split(':');
      const arrEnd = checkedShift.end.split(':');

      if ((checkedShift.start.length === 5 && checkedShift.end.length === 5)
        && (Number(arrEnd[0]) < 24 && Number(arrStart[0]) < 24)
        && (Number(arrEnd[1]) < 60 && Number(arrStart[0]) < 60)
        && (Number(arrEnd[0] + arrEnd[1]) > Number(arrStart[0] + arrStart[1]))) {

        checkedShift.isValid = true;
      } else {
        checkedShift.isValid = false;
      }

      return newObj;
    case ActionTypes.CHECK_INTERSECTION:
      newObj.editList.forEach((shift) => shift.intersectionValid = true);

      newObj.editList.forEach(({ isValid, start, end, id, intersectionValid }) => {
        if (!isValid) {

          return;
        }

        const firstStart = timeToNumber(start);
        const firstEnd = timeToNumber(end);

        newObj.editList.forEach((secondShift) => {
          if (!secondShift.isValid || secondShift.id === id) {

            return;
          }

          const secondStart = timeToNumber(secondShift.start);
          const secondEnd = timeToNumber(secondShift.end);

          if (firstStart <= secondEnd && firstEnd >= secondStart) {
            intersectionValid = false;
            secondShift.intersectionValid = false;
          }
        });
      });

      return newObj;
    case ActionTypes.SUBMIT_CHANGES:
      newObj.shiftList = JSON.parse(JSON.stringify(newObj.editList));

      return newObj;
    case ActionTypes.UPDATE_SHIFT:
      newObj.editList.forEach((shift) => {
        if (shift.id === action.id) {
          shift.start = action.start;
          shift.end = action.end;
        }
      });

      return newObj;
    case ActionTypes.CHECK_FORM_VALID:
      newObj.formValid = newObj.editList.every(({ isValid, intersectionValid }) => (isValid && intersectionValid));

      return newObj;
    default:
      return state;
  }
};
