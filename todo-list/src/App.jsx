import React from 'react';
import './App.css';
import Header from './Header';
import Footer from './Footer';
import TodoItem from './TodoItem';

const ENTER = 'Enter';

class App extends React.Component {
    constructor() {
        super();
        const storageData = localStorage.getItem('todoArray');
        this.state = {
            todoArray: storageData ? JSON.parse(storageData) : [],
            newTodo: '',
            commonOpen: false,
            displayOption: 'all',
            someIsCompleted: false
        };
    }
    addTodo(event) {
        if (event.key === ENTER && this.state.newTodo) {
            this.setState({
                newTodo: '',
                todoArray: [{
                    title: this.state.newTodo,
                    id: new Date().getTime().toString().substr(5),
                    open: true
                }].concat(this.state.todoArray)
            });
            this.refreshStorage();
        }
    }
    getNewTodo({ target }) {
        this.setState({ newTodo: target.value });
    }
    deleteTodo({ target }) {
        this.setState({
            todoArray: this.state.todoArray.filter((elem) => elem.id !== target.parentNode.id),
            someIsCompleted: this.state.todoArray.some((todo) => !todo.open)
        });
        this.refreshStorage();
    }
    changeStatus({ target }) {
        this.setState({
            todoArray: this.state.todoArray.map((todo) => {
                if (todo.id === target.parentNode.id) {
                    todo.open = !todo.open;
                }

                return todo;
            }),
            commonOpen: this.state.todoArray.every((todo) => !todo.open),
            someIsCompleted: this.state.todoArray.some((todo) => !todo.open)
        });
        this.refreshStorage();
    }
    changeDisplayOptions({ target }) {
        this.setState({ displayOption: target.id });
    }
    checkAll() {
        if (!this.state.todoArray.length) return;

        this.setState({
            todoArray: this.state.todoArray.map((todo) => {
                todo.open = this.state.commonOpen;

                return todo;
            }),
            commonOpen: !this.state.commonOpen,
            someIsCompleted: this.state.todoArray.some((todo) => !todo.open)
        });
        this.refreshStorage();
    }
    clearCompleted() {
        this.setState({
            todoArray: this.state.todoArray.filter((todo) => todo.open),
            someIsCompleted: false
        });
        this.refreshStorage();
    }
    rewriteTodo(id, newTitle) {
        this.setState({ todoArray: this.state.todoArray.map((todo) => {
            if (todo.id === id) {
                todo.title = newTitle;
            }

            return todo;
        })});
        this.refreshStorage();
    }
    refreshStorage() {
        localStorage.setItem('todoArray', JSON.stringify(this.state.todoArray));
    }
    render() {
        return <div className="list" onKeyPress={ this.addTodo.bind(this) }>
            <Header
                checkAll = { this.checkAll.bind(this) }
                getNewTodo = { this.getNewTodo.bind(this) }
                open = { this.state.commonOpen }
                defaultValue = { this.state.newTodo }
            />
            { this.state.todoArray.map(({ id, open, title }) =>
                <TodoItem
                    changeStatus={ this.changeStatus.bind(this) }
                    deleteTodo={ this.deleteTodo.bind(this) }
                    rewriteTodo={ this.rewriteTodo.bind(this) }
                    displayOption={ this.state.displayOption }
                    key={ id } id={ id } open={ open } title={ title }
                />
            )}
            <Footer
                clearCompleted={ this.clearCompleted.bind(this) }
                handler={ this.changeDisplayOptions.bind(this) }
                length={ this.state.todoArray.length }
                chosenFilter={ this.state.displayOption }
                someIsCompleted={ this.state.someIsCompleted }
            />
        </div>;
    }
}

export default App;
