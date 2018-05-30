import React from 'react';
import './Add.less';
import { CONST, CSS } from '../CONST';

const { ADD } = CSS;

const Add = ({ addOrChange }) => (
    <form className={ ADD.CONTAINER } onSubmit={ addOrChange }>
        <div className={ ADD.TITLE }>Add news:</div>
        <input className={ ADD.NEWTITLE } placeholder={ CONST.TITLE_PLACEHOLDER }/>
        <textarea className={ ADD.NEWTEXT } placeholder={ CONST.NEWS_PLACEHOLDER }/>
        <button className={ ADD.SUBMIT } type="submit">Add</button>
    </form>
)


export default Add;