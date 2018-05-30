import React from 'react';
import './Error_404.less';
import { NavLink } from 'react-router-dom';
import createHistory from "history/createBrowserHistory";
import { CSS } from '../CONST';

const { ERROR404 } = CSS;

const Error_404 = () => {
    const history = createHistory();

    return (
        <div className={ ERROR404.CONTAINER }>
            <div className={ ERROR404.IMAGE }>
            </div>
            <div className={ ERROR404.INFO }>
                Ooops! It seems that there is no such page.
                You can return to the
                <button
                    className={ ERROR404.BACK }
                    onClick={ history.goBack }>previous page
                </button> or <NavLink className={ ERROR404.LINK } to="/">home</NavLink>
            </div>
        </div>
    )
};

export default Error_404;