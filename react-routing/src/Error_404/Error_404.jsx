import React from 'react';
import './Error_404.less';
import { NavLink } from 'react-router-dom';
import createHistory from "history/createBrowserHistory";

const Error_404 = () => {
    const history = createHistory();

    return (
        <div className="error404">
            <div className="error404__image">
            </div>
            <div className="error404__info">
                Ooops! It seems that there is no such page.
                You can return to the
                <button className="error404__back" onClick={ history.goBack }>previous page</button> or <NavLink className="error404__link" to="/">home</NavLink>
            </div>
        </div>
    )
};

export default Error_404;