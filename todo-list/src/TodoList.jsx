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

        this.addTodo = this.addTodo.bind(this);
        this.checkAll = this.checkAll.bind(this);
        this.controlInput = this.controlInput.bind(this);
        this.changeStatus = this.changeStatus.bind(this);
        this.deleteTodo = this.deleteTodo.bind(this);
        this.unlockTodo = this.unlockTodo.bind(this);
        this.lockAndRewriteTodo = this.lockAndRewriteTodo.bind(this);
        this.clearCompleted = this.clearCompleted.bind(this);
        this.changeDisplayOptions = this.changeDisplayOptions.bind(this);
    }

    static generateID() {
        return new Date().getTime().toString().substr(5);
    }

    addTodo({ key, target: { value } }) {
        if (key === CONST.ENTER && value.trim()) {
            this.setState(({ todoArray }) => ({
                todoArray: [{
                    title: value,
                    id: TodoList.generateID(),
                    completed: CONST.UNCOMPLETED_DEFAULT,
                    lock: true
                }, ...todoArray],
                value: ''
            }));
        }
    }

    deleteTodo({ target: { parentNode: { id }} }) {
        this.setState(({ todoArray, numberOfCompleted }) => ({
            todoArray: todoArray.filter((todo) => todo.id !== id),
            numberOfCompleted: (todoArray.find((todo) => todo.id === id)).completed ?
                numberOfCompleted - 1 : numberOfCompleted,
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
        this.setState({ value });
    }

    render() {
        const { numberOfCompleted, todoArray, value, chosenFilter } = this.state;

        return <div className={ CONST.LIST_CLASSNAME }>
            <Header
                addTodo={ this.addTodo }
                checkAll={ this.checkAll }
                controlInput={ this.controlInput }
                numberOfCompleted={ numberOfCompleted }
                numberOfTodos={ todoArray.length }
                value={ value }
            />
            { this.state.todoArray.map(({ id, completed, title, lock }) =>
                <TodoItem
                    changeStatus={ this.changeStatus }
                    deleteTodo={ this.deleteTodo }
                    unlockTodo={ this.unlockTodo }
                    lockAndRewriteTodo={ this.lockAndRewriteTodo }
                    chosenFilter={ chosenFilter }
                    key={ id } lock={ lock } id={ id } completed={ completed } title={ title }
                />
            )}
            <Footer
                clearCompleted={ this.clearCompleted }
                handler={ this.changeDisplayOptions }
                length={ todoArray.length }
                chosenFilter={ chosenFilter }
                numberOfCompleted={ numberOfCompleted }
            />
        </div>;
    }
}

export default TodoList;
