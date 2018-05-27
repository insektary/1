const chosenFilter = (state = 'all', action) => {
    if (action.type === 'CHANGE_FILTER') {
        return action.filter;
    }

    return state;
};

export default chosenFilter;