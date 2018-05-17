import React from 'react';
import './footer.less';

const ALL_ID = 'all';
const ACTIVE_ID = 'active';
const COMPLETED_ID = 'completed';
const FOOTER_CLASSNAME = 'footer';
const FOOTER_HIDDEN = 'footer--hidden';
const COUNTER_CLASSNAME = 'footer__counter';
const BUTTON_CLASSNAME = 'footer-button';
const BUTTON_ACTIVE = 'footer-button--active';
const BUTTON_HIDDEN = 'footer-button--hidden';

const FilterButton = ({ id, clickHandler, content, chosenFilter }) => (
    <button id={ id } onClick={ clickHandler }
            className={ (chosenFilter === id) ? BUTTON_ACTIVE : BUTTON_CLASSNAME }>{ content }
    </button>
);

const Footer = ({ clearCompleted, length, handler, chosenFilter, someIsCompleted }) => (
    <div className={ length ? FOOTER_CLASSNAME : FOOTER_HIDDEN }>
        <div className={ COUNTER_CLASSNAME }>{ length } items left</div>
        <FilterButton id={ ALL_ID } clickHandler={ handler } content="All" chosenFilter={ chosenFilter }/>
        <FilterButton id={ ACTIVE_ID } clickHandler={ handler } content="Active" chosenFilter={ chosenFilter }/>
        <FilterButton id={ COMPLETED_ID } clickHandler={ handler } content="Completed" chosenFilter={ chosenFilter }/>
        <button onClick={ clearCompleted } className={ someIsCompleted ? BUTTON_CLASSNAME : BUTTON_HIDDEN }>Clear completed</button>
    </div>
);

export default Footer;