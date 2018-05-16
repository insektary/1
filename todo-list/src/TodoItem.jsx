import React from 'react';
import './App.css';

class Input extends React.Component {
    constructor({ title, open, rewriteTodo, id }) {
        super();
        this.state = {
            title: title,
            open: open,
            lock: true,
            rewriteTodo: rewriteTodo,
            id: id
        }
    }
    unLock() {
        this.setState({ lock: false });
    }
    fixedNewTitle({ target }) {
        this.setState({ title: target.value });
    }
    lockAndRewrite() {
        this.setState({ lock: true });
        this.state.rewriteTodo(this.state.id, this.state.title);
    }
    render() {
        return <input
            className={ this.state.open ? "item__todo-title" : "item__todo-title--done" }
            readOnly={ this.state.lock ? 'readonly' : '' }
            value={ this.state.title }
            onChange={ this.fixedNewTitle.bind(this) }
            onDoubleClick={ this.unLock.bind(this) }
            onBlur={ this.lockAndRewrite.bind(this) }
        />
    }
}

const TodoItem = ({ changeStatus, deleteTodo, rewriteTodo, displayOption, id, open, title }) => {
    const visibility = ((displayOption === "all")
        || (displayOption === "active" && open)
        || (displayOption === 'completed' && !open));
    return (
        <div id={ id } key={ id } className={ visibility ? "item" : "item--hidden" }>
            <button
                className={ open ? "item__check-button" : "item__check-button--done" }
                onClick={ changeStatus }>&#10004;
            </button>
            <Input
                open={ open } title={ title } rewriteTodo={ rewriteTodo } id={ id }
            />
            <button
                className="item__delete-button"
                onClick={ deleteTodo }>&#10006;
            </button>
        </div>
    );
};

export default TodoItem;