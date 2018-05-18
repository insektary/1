import React, { Component } from 'react';
import './app.less';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import TodoItem from './TodoItem/TodoItem';
import CONST from './Constants';

class App extends Component {
    constructor() {
        super();
        this.state = {
            todoArray: [],
            newTodo: '',
            someIsCompleted: false,
            everyIsCompleted: false,
            filterOption: CONST.FILTER_DEFAULT
        };
    }
    addTodo(event) {
        if (event.key === CONST.ENTER && this.state.newTodo.trim()) {
            this.setState((prevState) => {
                return {
                    newTodo: '',
                    todoArray: [{
                        title: prevState.newTodo,
                        id: new Date().getTime().toString().substr(5),
                        completed: false
                    }].concat(prevState.todoArray)
                }
            })
        }
    }
    getNewTodo({ target }) {
        this.setState({ newTodo: target.value });
    }
    deleteTodo({ target }) {
        this.setState((prevState) => {
            return {
                todoArray: prevState.todoArray.filter((todo) => todo.id !==target.parentNode.id),
            }
        });
    }
    refreshListOfCompleted() {
        this.setState((prevState) => {
            return {
                someIsCompleted: prevState.todoArray.some((todo) => todo.completed),
                everyIsCompleted: (prevState.todoArray.length === 0) ?  false : prevState.todoArray.every((todo) => todo.completed),
            }
        })
    }
    changeStatus({ target }) {
        this.setState((prevState) => {
            return {
                todoArray: prevState.todoArray.map((todo) => {
                    if (todo.id === target.parentNode.id) {
                        todo.completed = !todo.completed;
                    }

                    return todo;
                }),
                everyIsCompleted: prevState.todoArray.every((todo) => todo.completed),
                someIsCompleted: prevState.todoArray.some((todo) => todo.completed)
            }
        });
    }
    changeDisplayOptions({ target }) {
        this.setState({ filterOption: target.id });
    }
    checkAll() {
        if (!this.state.todoArray.length) return;

        this.setState((prevState) => {
            return {
                todoArray: prevState.todoArray.map((todo) => {
                    todo.completed = !prevState.everyIsCompleted;

                    return todo;
                }),
                everyIsCompleted: !prevState.everyIsCompleted,
                someIsCompleted: prevState.todoArray.some((todo) => todo.completed)
            }
        });
    }
    clearCompleted() {
        this.setState((prevState) => {
            return {
                todoArray: prevState.todoArray.filter((todo) => !todo.completed),
                someIsCompleted: false,
                everyIsCompleted: false
            }
        });
    }
    rewriteTodo(id, newTitle) {
        this.setState((prevState) => {
            return {
                todoArray: prevState.todoArray.map((todo) => {
                    if (todo.id === id) {
                        todo.title = newTitle;
                    }

                    return todo;
                })
            }
        });
    }
    render() {
        return <div className={ CONST.LIST_CLASSNAME }  onKeyPress={ this.addTodo.bind(this) }>
            <Header
                checkAll = { this.checkAll.bind(this) }
                getNewTodo = { this.getNewTodo.bind(this) }
                everyIsCompleted = { this.state.everyIsCompleted }
                defaultValue = { this.state.newTodo }
                numberOfTodos = { this.state.todoArray.length }
            />
            { this.state.todoArray.map(({ id, completed, title }) =>
                <TodoItem
                    refreshListOfCompleted={ this.refreshListOfCompleted.bind(this) }
                    changeStatus={ this.changeStatus.bind(this) }
                    deleteTodo={ this.deleteTodo.bind(this) }
                    rewriteTodo={ this.rewriteTodo.bind(this) }
                    filterOption={ this.state.filterOption }
                    key={ id } id={ id } completed={ completed } title={ title }
                />
            )}
            <Footer
                clearCompleted={ this.clearCompleted.bind(this) }
                handler={ this.changeDisplayOptions.bind(this) }
                length={ this.state.todoArray.length }
                chosenFilter={ this.state.filterOption }
                someIsCompleted={ this.state.someIsCompleted }
            />
        </div>;
    }
}

export default App;
