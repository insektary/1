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
            someIsCompleted: false,
            everyIsCompleted: false,
            chosenFilter: CONST.FILTER_DEFAULT
        };
    }

    addTodo({ key, target }) {
        if (key === CONST.ENTER && target.value.trim()) {
            this.setState((prevState) => ({
                todoArray: [{
                    title: target.value,
                    id: this.generateID(),
                    completed: CONST.COMPLETED_DEFAULT,
                    lock: true
                }].concat(prevState.todoArray)
            }));
        }
    }

    generateID() {
        return new Date().getTime().toString().substr(5);
    }

    deleteTodo({ target: { parentNode: { id } } }) {
        this.setState(({ todoArray }) => ({
            todoArray: todoArray.filter((todo) => todo.id !== id),
            someIsCompleted: todoArray.some((todo) => todo.completed),
            everyIsCompleted: (!todoArray.length) ?  false : todoArray.every((todo) => todo.completed)
        }));
    }

    refreshListOfCompleted() {
        this.setState(({ todoArray }) => ({
            someIsCompleted: todoArray.some((todo) => todo.completed),
            everyIsCompleted: (!todoArray.length) ?  false : todoArray.every((todo) => todo.completed),
        }));
    }

    changeStatus({ target }) {
        this.setState(({ todoArray }) => ({
            todoArray: todoArray.map((todo) => {
                if (todo.id === target.parentNode.id) {
                    todo.completed = !todo.completed;
                }

                return todo;
            }),
            everyIsCompleted: todoArray.every((todo) => todo.completed),
            someIsCompleted: todoArray.some((todo) => todo.completed)
        }));
    }

    changeDisplayOptions({ target }) {
        this.setState({ chosenFilter: target.id });
    }

    checkAll() {
        if (!this.state.todoArray.length) return;

        this.setState(({ todoArray, everyIsCompleted }) => ({
            todoArray: todoArray.map((todo) => {
                todo.completed = !everyIsCompleted;

                return todo;
            }),
            everyIsCompleted: !everyIsCompleted,
            someIsCompleted: todoArray.some((todo) => todo.completed)
        }));
    }

    clearCompleted() {
        this.setState(({ todoArray }) => ({
            todoArray: todoArray.filter((todo) => !todo.completed),
            someIsCompleted: false,
            everyIsCompleted: false
        }));
    }

    unlockTodo({ target }) {
        this.setState(({ todoArray }) => ({
            todoArray: todoArray.map((todo) => {
                if (todo.id === target.parentNode.id) {
                    todo.lock = false;
                }

                return todo;
            })
        }));
    }

    lockAndRewriteTodo(event) {
        if (event.type === CONST.KEYPRESS && event.key !== CONST.ENTER) return;

        const id = event.target.parentNode.id;
        const value = event.target.value;

        this.setState(({ todoArray }) => ({
            todoArray: todoArray.map((todo) => {
                if (todo.id === id) {
                    todo.title = value;
                    todo.lock = true;
                }

                return todo;
            })
        }));
    }

    render() {
        return <div className={ CONST.LIST_CLASSNAME }  onKeyPress={ this.addTodo.bind(this) }>
            <Header
                checkAll={ this.checkAll.bind(this) }
                everyIsCompleted={ this.state.everyIsCompleted }
                numberOfTodos={ this.state.todoArray.length }
            />
            { this.state.todoArray.map(({ id, completed, title, lock }) =>
                <TodoItem
                    refreshListOfCompleted={ this.refreshListOfCompleted.bind(this) }
                    changeStatus={ this.changeStatus.bind(this) }
                    deleteTodo={ this.deleteTodo.bind(this) }
                    unlockTodo={ this.unlockTodo.bind(this) }
                    lockAndRewriteTodo={ this.lockAndRewriteTodo.bind(this) }
                    chosenFilter={ this.state.chosenFilter }
                    key={ id } lock={ lock } id={ id } completed={ completed } title={ title }
                />
            )}
            <Footer
                clearCompleted={ this.clearCompleted.bind(this) }
                handler={ this.changeDisplayOptions.bind(this) }
                length={ this.state.todoArray.length }
                chosenFilter={ this.state.chosenFilter }
                someIsCompleted={ this.state.someIsCompleted }
            />
        </div>;
    }
}

export default App;
