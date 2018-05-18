import React, { Component } from 'react';
import './todoItem.less';
import CONST from '../Constants';

class TodoItem extends Component {
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
        if (type === CONST.EVENT_BLUR || key === CONST.EVENT_ENTER) {
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
        const visibility = ((this.props.filterOption === CONST.ALL_ID)
            || (this.props.filterOption === CONST.ACTIVE_ID && !this.props.completed)
            || (this.props.filterOption === CONST.COMPLETED_ID && this.props.completed));

        return (
            <div id={ this.props.id } key={ this.props.id } className={ visibility ? CONST.ITEM_CLASSNAME : CONST.ITEM_HIDDEN }>
                <button
                    className={ this.props.completed ? CONST.CHECKBUTTON_DONE : CONST.CHECKBUTTON_CLASSNAME }
                    onClick={ this.state.changeStatus }>&#10004;
                </button>
                <input
                    defaultValue={ this.props.title }
                    readOnly = { this.state.lock ? CONST.READONLY_ATTR : '' }
                    className={ this.props.completed ? CONST.TITLE_DONE : CONST.TITLE_CLASSNAME }
                    onDoubleClick={ this.unLock.bind(this) }
                    onBlur={ this.lock.bind(this) }
                    onKeyPress={ this.lock.bind(this) }
                    onChange={ this.changeTitle.bind(this) }
                />
                <button
                    className={ CONST.DELETE_BUTTON }
                    onClick={ this.state.deleteTodo }>&#10006;
                </button>
            </div>
        )
    }
}

export default TodoItem;