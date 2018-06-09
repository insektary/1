import React from 'react';
import './header.less';
import { CSS, EVENTS, ID } from '../Constants';

const Header = ({ todoList, addTodo, checkAll }) => {
    let modifier;

    if (!todoList.length) {
        modifier = CSS.ALL_CHECKBUTTON_HIDDEN;
    } else if (todoList.every(({ completed }) => completed)) {
        modifier = CSS.ALL_CHECKBUTTON_DONE;
    } else {
        modifier = CSS.ALL_CHECKBUTTON_VISIBLE;
    }

    return (
        <div className={ CSS.HEADER }>
            <button className={ `${ CSS.ALL_CHECKBUTTON_BASE } ${ modifier }` } onClick={ () => checkAll() }>&#9660;</button>
            <input className={ CSS.INPUT } placeholder={ ID.PLACEHOLDER } onKeyPress={ (event) => {
                if (event.key === EVENTS.ENTER && event.target.value.trim()) {
                    addTodo(event, new Date().getTime().toString().substr(5));
                    event.target.value = '';
                }
            }}/>
        </div>
    )
};

export default Header;