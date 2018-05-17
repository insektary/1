import React from 'react';
import './header.less';

const PLACEHOLDER = 'ToDo';
const HEADER_CLASSNAME = 'header';
const INPUT_CLASSNAME = 'header__todo-input';
const CHECKBUTTON_VISIBLE = "header__check-button";
const CHECKBUTTON_DONE = 'header__check-button--done';
const CHECKBUTTON_HIDDEN = 'header__check-button--hidden';

const Header = ({ checkAll, getNewTodo, everyIsCompleted, defaultValue, numberOfTodos }) => (
    <div className={ HEADER_CLASSNAME }>
        <button
            className={
                `${ everyIsCompleted ? CHECKBUTTON_DONE : CHECKBUTTON_VISIBLE }
                 ${ numberOfTodos ? '' : CHECKBUTTON_HIDDEN }`
            }
            onClick={ checkAll }>&#9660;
        </button>
        <input
            className={ INPUT_CLASSNAME }
            value={ defaultValue }
            onChange={ getNewTodo }
            placeholder={ PLACEHOLDER }
        />
    </div>
);

export default Header;