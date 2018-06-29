import {ActionTypes, ChangeFilter} from '../actions/actions';
import {ChosenFilter, initialChosenFilterState} from '../state/chosen-filter.state';

export const chosenFilterReducer = (state = initialChosenFilterState, action: ChangeFilter): ChosenFilter => {
  if (action.type === ActionTypes.CHANGE_FILTER) {
    return action.id;
  }

  return state;
};
