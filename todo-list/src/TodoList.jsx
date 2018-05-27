import React from 'react';
import { connect } from 'react-redux';
import './todolist.less';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import TodoItem from './TodoItem/TodoItem';
import CONST from './Constants';

const TodoList = ({ todoList, chosenFilter, checkAll, changeFilter, clearCompleted,
                      deleteTodo, changeStatus, addTodo, unlockTodo, rewriteTodo }) => {
    return <div className={ CONST.LIST_CLASSNAME }>
        <Header
            addTodo={ addTodo }
            checkAll={ checkAll }
            todoList={ todoList }
        />
        { todoList.map(({ id, completed, title, lock }) => <TodoItem
            deleteTodo={ deleteTodo } changeStatus={ changeStatus }
            unlockTodo={ unlockTodo } rewriteTodo={ rewriteTodo }
            chosenFilter={ chosenFilter } key={ id } lock={ lock }
            id={ id } completed={ completed } title={ title }/>
        )}
        <Footer
            changeFilter={ changeFilter }
            clearCompleted={ clearCompleted }
            todoList={ todoList }
            chosenFilter={ chosenFilter }
        />
    </div>;
};

export default connect(
    state => (state),
    dispatch => ({
        checkAll() {
            dispatch({ type: 'CHECK_ALL' });
        },
        changeFilter({ target: { id }}) {
            dispatch({ type: 'CHANGE_FILTER',  filter: id });
        },
        clearCompleted() {
            dispatch({ type: 'CLEAR_COMPLETED' });
        },
        deleteTodo({ target: { parentNode: { id }}}) {
            dispatch({ type: 'DELETE_TODO', id: id });
        },
        changeStatus({ target: { parentNode: { id }}}) {
            dispatch({ type: 'CHANGE_STATUS', id: id})
        },
        addTodo({ key, target }) {
            if (key === CONST.ENTER && target.value.trim()) {
                dispatch({ type: 'ADD_TODO', title: target.value });
                target.value = '';
            }
        },
        unlockTodo({ target: { parentNode: { id }}}) {
            dispatch({ type: 'UNLOCK_TODO', id: id });
        },
        rewriteTodo({ key, target }) {
            if (key === CONST.ENTER && target.value.trim()) {
                dispatch({ type: 'REWRITE_TODO', id: target.parentNode.id, title: target.title });
            }
        }
    })
)(TodoList);
