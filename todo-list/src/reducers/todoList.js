import { ACTIONS } from '../Constants';

const todoList = (state = [], { type, title, id }) => {
    switch (type) {
        case ACTIONS.ADD_TODO:
            return [
                ...state,
                {
                    title,
                    id,
                    completed: false,
                    lock: true
                }
            ];
        case ACTIONS.DELETE_TODO:
            return state.filter(({ id: currentId }) => currentId !== id);
        case ACTIONS.CHANGE_STATUS:
            return state.map(({ title, completed, lock, id: currentId }) => {
                if (currentId === id) {
                    return { title, completed: !completed, lock, id: currentId}
                }

                return { title, completed, lock, id: currentId}
            });
        case ACTIONS.CLEAR_COMPLETED:
            return state.filter((todo) => !todo.completed);
        case ACTIONS.UNLOCK_TODO:
            return state.map((todo) => {
                if (todo.id === id) {
                    todo.lock = false;
                }

                return todo;
            });
        case ACTIONS.REWRITE_TODO:
            return state.map((todo) => {
                if (todo.id === id) {
                    todo.title = title;
                    todo.lock = true;
                }

                return todo;
            });
        case ACTIONS.CHECK_ALL:
            const everyIsCompleted = state.every(({ completed }) => completed);

            return state.map((todo) => {
                todo.completed = !everyIsCompleted;

                return todo;
            });
        default:
            return state;
    }
};

export default todoList;