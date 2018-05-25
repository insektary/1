import React from 'react';
import './Add.less';
import { CONST, CSS } from '../CONST';

const Add = ({ addOrChange }) => (
    <form className={ CSS.ADD } onSubmit={ addOrChange }>
        <div className={ CSS.ADD_TITLE }>Add news:</div>
        <input className={ CSS.ADD_NEWTITLE } placeholder={ CONST.TITLE_PLACEHOLDER }/>
        <textarea className={ CSS.ADD_NEWTEXT } placeholder={ CONST.NEWS_PLACEHOLDER }/>
        <button className={ CSS.ADD_SUBMIT } type="submit">Add</button>
    </form>
)


export default Add;