import actionCreators from './actionCreators';
import CONST from '../Constants';

const generateID = () => new Date().getTime().toString().substr(5);

const { checkAll, changeFilter, clearCompleted,
    deleteTodo, changeStatus, addTodo, unlockTodo, rewriteTodo } = actionCreators;

const middlewareActionCreators = dispatch => ({
    checkAll() {
        dispatch(checkAll());
    },
    changeFilter(event) {
        dispatch(changeFilter(event));
    },
    clearCompleted() {
        dispatch(clearCompleted());
    },
    deleteTodo(event) {
        dispatch(deleteTodo(event));
    },
    changeStatus(event) {
        dispatch(changeStatus(event));
    },
    addTodo(event) {
        if (event.key === CONST.ENTER && event.target.value.trim()) {
            dispatch(addTodo(event, generateID()));
            event.target.value = '';
        }
    },
    unlockTodo(event) {
        dispatch(unlockTodo(event));
    },
    rewriteTodo(event) {
        if (event.key === CONST.ENTER && event.target.value.trim()) {
            dispatch(rewriteTodo(event));
        }
    }
});

export default middlewareActionCreators;