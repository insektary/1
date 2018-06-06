import CONST from '../Constants';

const { ACTIONS } = CONST;

const actionCreators = {

    checkAll() {
        return { type: ACTIONS.CHECK_ALL };
    },

    changeFilter({ target: { id }}) {
        return { type: ACTIONS.CHANGE_FILTER,  filter: id };
    },

    clearCompleted() {
        return { type: ACTIONS.CLEAR_COMPLETED };
    },

    deleteTodo({ target: { parentNode: { id }}}) {
        return { type: ACTIONS.DELETE_TODO, id };
    },

    addTodo({ target: { value }}, id) {
        return { type: ACTIONS.ADD_TODO, title: value, id };
    },

    unlockTodo({ target: { parentNode: { id }}}) {
        return { type: ACTIONS.UNLOCK_TODO, id };
    },

    rewriteTodo({ target: { value, parentNode: { id }}}) {
        return { type: ACTIONS.REWRITE_TODO, id, title: value };
    },

    changeStatus({ target: { parentNode: { id }}}) {
        return { type: ACTIONS.CHANGE_STATUS, id };
    },
};

export default actionCreators;