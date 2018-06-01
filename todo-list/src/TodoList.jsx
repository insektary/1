import React from 'react';
import { connect } from 'react-redux';
import './todolist.less';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import TodoItem from './TodoItem/TodoItem';
import CONST from './Constants';
import middlewareActionCreators from './actionCreators/middlewareActionCreators';

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
    middlewareActionCreators
)(TodoList);
