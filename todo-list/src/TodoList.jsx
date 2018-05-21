import React, { Component } from 'react';
import './todolist.less';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import TodoItem from './TodoItem/TodoItem';
import CONST from './Constants';

class TodoList extends Component {
    constructor() {
        super();
        this.state = {
            todoArray: [],
            numberOfCompleted: 0,
            chosenFilter: CONST.FILTER_DEFAULT,
            value: ''
        };
    }

    addTodo({ key, target: { value } }) {
        if (key === CONST.ENTER && value.trim()) {
            this.setState(({ todoArray }) => ({
                todoArray: [{
                    title: value,
                    id: this.generateID(),
                    completed: CONST.COMPLETED_DEFAULT,
                    lock: true
                }, ...todoArray],
                value: ''
            }));
        }
    }

    generateID() {
        return new Date().getTime().toString().substr(5);
    }

    deleteTodo({ target: { parentNode: { id }} }) {
        this.setState(({ todoArray, numberOfCompleted }) => ({
            todoArray: todoArray.filter((todo) => todo.id !== id),
            numberOfCompleted: (todoArray.find((todo) => todo.id === id)).completed ?
                numberOfCompleted - 1 : numberOfCompleted + 1,
        }));
    }

    changeStatus({ target: { parentNode: { id }} }) {
        this.setState(({ todoArray, numberOfCompleted }) => ({
            todoArray: todoArray.map((todo) => {
                if (todo.id === id) {
                    todo.completed = !todo.completed;
                }

                return todo;
            }),
            numberOfCompleted: (todoArray.find((todo) => todo.id === id)).completed ?
                numberOfCompleted + 1 : numberOfCompleted - 1,
        }));
    }

    changeDisplayOptions({ target: { id } }) {
        this.setState({ chosenFilter: id });
    }

    checkAll() {
        if (!this.state.todoArray.length) return;

        const everyIsCompleted = (this.state.numberOfCompleted === this.state.todoArray.length);

        this.setState(({ todoArray }) => ({
            todoArray: todoArray.map((todo) => {
                todo.completed = !everyIsCompleted;

                return todo;
            }),
            numberOfCompleted: (everyIsCompleted ? 0 : todoArray.length)
        }));
    }

    clearCompleted() {
        this.setState(({ todoArray }) => ({
            todoArray: todoArray.filter((todo) => !todo.completed),
            numberOfCompleted: 0
        }));
    }

    unlockTodo({ target: { parentNode: { id } } }) {
        this.setState(({ todoArray }) => ({
            todoArray: todoArray.map((todo) => {
                if (todo.id === id) {
                    todo.lock = false;
                }

                return todo;
            })
        }));
    }

    lockAndRewriteTodo({ type, key, target: { value, parentNode: { id } } }) {
        if (type === CONST.KEYPRESS && key !== CONST.ENTER) return;

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

    controlInput({ target: { value } }) {
        this.setState({value: value});
    }

    render() {
        return <div className={ CONST.LIST_CLASSNAME }  onKeyPress={ this.addTodo.bind(this) }>
            <Header
                checkAll={ this.checkAll.bind(this) }
                controlInput={ this.controlInput.bind(this) }
                numberOfCompleted={ this.state.numberOfCompleted }
                numberOfTodos={ this.state.todoArray.length }
                value={ this.state.value }
            />
            { this.state.todoArray.map(({ id, completed, title, lock }) =>
                <TodoItem
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
                numberOfCompleted={ this.state.numberOfCompleted }
            />
        </div>;
    }
}

export default TodoList;
