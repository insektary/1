import React from 'react';
import './Error_404.less';
import { NavLink } from 'react-router-dom';
import createHistory from "history/createBrowserHistory";
import { CSS } from '../CONST';

const Error_404 = () => {
    const history = createHistory();

    return (
        <div className={ CSS.ERROR404 }>
            <div className={ CSS.ERROR404_IMAGE }>
            </div>
            <div className={ CSS.ERROR404_INFO }>
                Ooops! It seems that there is no such page.
                You can return to the
                <button
                    className={ CSS.ERROR404_BACK }
                    onClick={ history.goBack }>previous page
                </button> or <NavLink className={ CSS.ERROR404_LINK } to="/">home</NavLink>
            </div>
        </div>
    )
};

export default Error_404;