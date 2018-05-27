import React from 'react';
import './header.less';
import CONST from '../Constants';

const Header = ({ checkAll, todoList, addTodo }) => {
    let modifier;

    if (!todoList.length) {
        modifier = CONST.ALL_CHECKBUTTON_HIDDEN;
    } else if (todoList.every(({ completed }) => completed)) {
        modifier = CONST.ALL_CHECKBUTTON_DONE;
    } else {
        modifier = CONST.ALL_CHECKBUTTON_VISIBLE;
    }

    return (
        <div className={ CONST.HEADER_CLASSNAME }>
            <button className={ `${ CONST.ALL_CHECKBUTTON_BASE } ${ modifier }` } onClick={ checkAll }>&#9660;</button>
            <input className={ CONST.INPUT_CLASSNAME } placeholder={ CONST.PLACEHOLDER } onKeyPress={ addTodo }/>
        </div>
    )
};

export default Header;