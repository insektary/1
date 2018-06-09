import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './todolist.less';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import TodoItem from './TodoItem/TodoItem';
import * as actionCreator from './actionCreators/actionCreators';
import { CSS } from './Constants';

export const TodoList = ({ todoList, chosenFilter, actions }) => {
    const { addTodo, checkAll, changeStatus, deleteTodo, unlockTodo, rewriteTodo, changeFilter, clearCompleted } = actions;

    return <div className={ CSS.LIST }>
        <Header
            addTodo={ addTodo }
            checkAll={ checkAll }
            todoList={ todoList }
        />
        { todoList.map(({ id, completed, title, lock }) => <TodoItem
            changeStatus={ changeStatus } deleteTodo={ deleteTodo }
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

const mapStateToProps = state => ({
    todoList: state.todoList,
    chosenFilter: state.chosenFilter
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actionCreator, dispatch)
});


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoList);
