const generateID = () => new Date().getTime().toString().substr(5);

const todoList = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [
                ...state,
                {
                    title: action.title,
                    id: generateID(),
                    completed: false,
                    lock: true
                }
            ];
        case 'DELETE_TODO':
            return state.filter(({ id }) => id !== action.id);
        case 'CHANGE_STATUS':
            return state.map((todo) => {
                if (todo.id === action.id) {
                    todo.completed = !todo.completed;
                }

                return todo;
            });
        case 'CLEAR_COMPLETED':
            return state.filter((todo) => !todo.completed);
        case 'UNLOCK_TODO':
            return state.map((todo) => {
                if (todo.id === action.id) {
                    todo.lock = false;
                }

                return todo;
            });
        case 'REWRITE_TODO':
            return state.map((todo) => {
                if (todo.id === action.id) {
                    todo.title = action.title;
                    todo.lock = true;
                }

                return todo;
            });
        case 'CHECK_ALL':
            if (!state.length) return;

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