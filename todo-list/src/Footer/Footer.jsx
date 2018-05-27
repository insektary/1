import React from 'react';
import './footer.less';
import CONST from '../Constants';

const FilterButton = ({ id, changeFilter, content, chosenFilter }) => (
    <button
        id={ id } onClick={ changeFilter }
        className={ (chosenFilter === id) ? CONST.BUTTON_ACTIVE : CONST.BUTTON_CLASSNAME }
    >{ content }</button>
);

const Footer = ({ clearCompleted, todoList, changeFilter, chosenFilter }) => {
    const numberOfCompleted = todoList.reduce((counter, { completed }) => {
        if (completed) {
            return counter + 1;
        } else {
            return counter;
        }
    }, 0);

    return (
        <div className={ todoList.length ? CONST.FOOTER_CLASSNAME : CONST.FOOTER_HIDDEN }>
            <div className={ CONST.COUNTER_CLASSNAME }>{ todoList.length - numberOfCompleted } items left</div>
            <FilterButton id={ CONST.ALL_ID } changeFilter={ changeFilter } content="All" chosenFilter={ chosenFilter }/>
            <FilterButton id={ CONST.ACTIVE_ID } changeFilter={ changeFilter } content="Active" chosenFilter={ chosenFilter }/>
            <FilterButton id={ CONST.COMPLETED_ID } changeFilter={ changeFilter } content="Completed" chosenFilter={ chosenFilter }/>
            <button onClick={ clearCompleted } className={ numberOfCompleted ? CONST.BUTTON_CLASSNAME : CONST.BUTTON_HIDDEN }>Clear completed</button>
        </div>
    )
};

export default Footer;