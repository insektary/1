import {ActionTypes, Actions} from '../actions/actions';
import {initialTodoListState, Todo, TodoList} from '../state/todo-list.state';

export const todoListReducer = (state = initialTodoListState, action: Actions): TodoList => {
  switch (action.type) {
    case ActionTypes.ADD_TODO:
      return [...state, new Todo(action.title)];
    case ActionTypes.DELETE_TODO:
      return state.filter(({ id }) => id !== action.id);
    case ActionTypes.CHANGE_STATUS:
      return state.map((todo) => {
        if (todo.id === action.id) {
          todo.completed = !todo.completed;
        }

        return todo;
      });
    case ActionTypes.CLEAR_COMPLETED:
      return state.filter((todo) => !todo.completed);
    case ActionTypes.UNLOCK_TODO:
      return state.map((todo) => {
        if (todo.id === action.id) {
          todo.lock = false;
        }

        return todo;
      });
    case ActionTypes.REWRITE_TODO:
      return state.map((todo) => {
        if (todo.id === action.id) {
          todo.title = action.title;
          todo.lock = true;
        }

        return todo;
      });
    case ActionTypes.CHECK_ALL:
      if (!state.length) {

        return;
      }

      const everyIsCompleted = state.every(({ completed }) => completed);

      return state.map((todo) => {
          todo.completed = !everyIsCompleted;

          return todo;
      });
    default:
      return state;
  }
};
