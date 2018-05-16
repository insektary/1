import React from 'react';
import './App.css';

const FilterButton = ({ id, clickHandler, content, chosenFilter }) => (
    <button id={ id } onClick={ clickHandler }
            className={ (chosenFilter === id) ? "footer-button--active" : "footer-button" }>{ content }
    </button>
);

const Footer = ({clearCompleted, length, handler, chosenFilter, someIsCompleted}) => (
    <div className={ length ? "footer" : "footer-hidden" }>
        <div className="footer__counter">{ length } items left</div>
        <FilterButton id="all" clickHandler={ handler } content="All" chosenFilter={ chosenFilter }/>
        <FilterButton id="active" clickHandler={ handler } content="Active" chosenFilter={ chosenFilter }/>
        <FilterButton id="completed" clickHandler={ handler } content="Completed" chosenFilter={ chosenFilter }/>
        <button onClick={ clearCompleted } className={ someIsCompleted ? "footer-button" : "footer-button--hidden"}>Clear completed</button>
    </div>
);

export default Footer;