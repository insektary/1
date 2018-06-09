import { ACTIONS } from '../Constants';

export const checkAll = () => ({ type: ACTIONS.CHECK_ALL });
export const changeFilter = ({ target: { id }}) => ({ type: ACTIONS.CHANGE_FILTER,  filter: id });
export const clearCompleted = () => ({ type: ACTIONS.CLEAR_COMPLETED });
export const deleteTodo = ({ target: { parentNode: { id }}}) => ({ type: ACTIONS.DELETE_TODO, id });
export const addTodo = ({ target: { value }}, id) => ({ type: ACTIONS.ADD_TODO, title: value, id });
export const unlockTodo = ({ target: { parentNode: { id }}}) => ({ type: ACTIONS.UNLOCK_TODO, id });
export const rewriteTodo = ({ target: { value, parentNode: { id }}}) => ({ type: ACTIONS.REWRITE_TODO, id, title: value });
export const changeStatus = ({ target: { parentNode: { id }}}) => ({ type: ACTIONS.CHANGE_STATUS, id });
