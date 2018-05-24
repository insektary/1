import React from 'react';
import './Error_204.less';
import { NavLink } from 'react-router-dom';
import createHistory from "history/createBrowserHistory";
import { CSS } from '../CONST';

const Error_204 = () => {
    const history = createHistory();

    return (
        <div className={ CSS.ERROR404 }>
            <div className={ CSS.ERROR204_IMAGE }>&#9998;</div>
            <div className={ CSS.ERROR404_INFO }>
                An article with this number has not yet been created.
                You can return to the
                <button
                    className={ CSS.ERROR404_BACK }
                    onClick={ history.goBack }>previous page
                </button> or <NavLink className={ CSS.ERROR404_LINK } to="/">home</NavLink>
            </div>
        </div>
    )
};

export default Error_204;