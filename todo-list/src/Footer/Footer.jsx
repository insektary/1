import React from 'react';
import './footer.less';
import { CSS, ID } from '../Constants';
import FilterButton from './FilterButton';

const Footer = ({ todoList, chosenFilter, changeFilter, clearCompleted }) => {
    const numberOfCompleted = todoList.reduce((counter, { completed }) => {
        if (completed) {
            return counter + 1;
        } else {
            return counter;
        }
    }, 0);

    return (
        <div className={ todoList.length ? CSS.FOOTER : CSS.FOOTER_HIDDEN }>
            <div className={ CSS.COUNTER }>{ todoList.length - numberOfCompleted } items left</div>
            <FilterButton id={ ID.ALL } changeFilter={ (event) => changeFilter(event) } content="All" chosenFilter={ chosenFilter }/>
            <FilterButton id={ ID.ACTIVE } changeFilter={ (event) => changeFilter(event) } content="Active" chosenFilter={ chosenFilter }/>
            <FilterButton id={ ID.COMPLETED } changeFilter={ (event) => changeFilter(event) } content="Completed" chosenFilter={ chosenFilter }/>
            <button id={ ID.CLEAR_COMPLETED } onClick={ () => clearCompleted() } className={ numberOfCompleted ? CSS.BUTTON : CSS.BUTTON_HIDDEN }>Clear completed</button>
        </div>
    )
};

export default Footer;