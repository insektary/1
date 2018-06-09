import { ACTIONS } from '../Constants';

const chosenFilter = (state = 'all', action) => {
    if (action.type === ACTIONS.CHANGE_FILTER) {
        return action.filter;
    }

    return state;
};

export default chosenFilter;