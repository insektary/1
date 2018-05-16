import React from 'react';
import './App.css';

const Header = ({checkAll, getNewTodo, open, defaultValue}) => (
    <div className="header">
        <button
            className={ open ? "header__check-button--done" : "header__check-button" }
            onClick={ checkAll }>&#9660;
        </button>
        <input
            className="header__todo-input"
            value={ defaultValue }
            onChange={ getNewTodo }
            placeholder="ToDo"
        />
    </div>
);

export default Header;