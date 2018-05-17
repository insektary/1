import React from 'react';
import './todoItem.less';

const EVENT_BLUR = 'blur';
const EVENT_ENTER = 'Enter';
const ALL_ID = 'all';
const ACTIVE_ID = 'active';
const COMPLETED_ID = 'completed';
const ITEM_CLASSNAME = 'item';
const ITEM_HIDDEN = 'item--hidden';
const CHECKBUTTON_CLASSNAME = 'item__check-button';
const CHECKBUTTON_DONE = "item__check-button--done";
const TITLE_CLASSNAME = 'item__todo-title';
const TITLE_DONE = 'item__todo-title--done';
const DELETE_BUTTON = 'item__delete-button';
const READONLY_ATTR = 'readonly';

class TodoItem extends React.Component {
    constructor({ changeStatus, deleteTodo, rewriteTodo, refreshListOfCompleted }) {
        super();
        this.state = {
            refreshListOfCompleted,
            changeStatus,
            deleteTodo,
            rewriteTodo,
            lock: true,
            newTitle: ''
        }
    }
    unLock() {
        this.setState({ lock: false });
    }
    lock({ type, key }) {
        if (type === EVENT_BLUR || key === EVENT_ENTER) {
            this.setState({ lock: true });
            this.state.rewriteTodo(this.props.id, this.state.newTitle);
        }
    }
    changeTitle({ target }) {
        this.setState({ newTitle: target.value });
    }
    componentWillUnmount() {
        this.state.refreshListOfCompleted();
    }
    render() {
        const visibility = ((this.props.filterOption === ALL_ID)
            || (this.props.filterOption === ACTIVE_ID && !this.props.completed)
            || (this.props.filterOption === COMPLETED_ID && this.props.completed));

        return (
            <div id={ this.props.id } key={ this.props.id } className={ visibility ? ITEM_CLASSNAME : ITEM_HIDDEN }>
                <button
                    className={ this.props.completed ? CHECKBUTTON_DONE : CHECKBUTTON_CLASSNAME }
                    onClick={ this.state.changeStatus }>&#10004;
                </button>
                <input
                    defaultValue={ this.props.title }
                    readOnly = { this.state.lock ? READONLY_ATTR : '' }
                    className={ this.props.completed ? TITLE_DONE : TITLE_CLASSNAME }
                    onDoubleClick={ this.unLock.bind(this) }
                    onBlur={ this.lock.bind(this) }
                    onKeyPress={ this.lock.bind(this) }
                    onChange={ this.changeTitle.bind(this) }
                />
                <button
                    className={ DELETE_BUTTON }
                    onClick={ this.state.deleteTodo }>&#10006;
                </button>
            </div>
        )
    }
}

export default TodoItem;