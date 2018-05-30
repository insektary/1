import React from 'react';
import './Error_204.less';
import { NavLink } from 'react-router-dom';
import createHistory from "history/createBrowserHistory";
import { CSS } from '../CONST';

const { ERROR404, ERROR204 } = CSS;

const Error_204 = () => {
    const history = createHistory();

    return (
        <div className={ ERROR404.CONTAINER }>
            <div className={ ERROR204.IMAGE }>&#9998;</div>
            <div className={ ERROR404.INFO }>
                An article with this number has not yet been created.
                You can return to the
                <button
                    className={ ERROR404.BACK }
                    onClick={ history.goBack }>previous page
                </button> or <NavLink className={ ERROR404.LINK } to="/">home</NavLink>
            </div>
        </div>
    )
};

export default Error_204;