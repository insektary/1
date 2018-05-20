import React from 'react';
import './header.less';
import CONST from '../Constants';

const Header = ({ checkAll, numberOfCompleted, value, numberOfTodos, controlInput }) => {
    let modifier;

    if (!numberOfTodos) {
        modifier = CONST.CHECKBUTTON_HIDDEN;
    } else if (numberOfTodos === numberOfCompleted) {
        modifier = CONST.ALL_CHECKBUTTON_DONE;
    } else {
        modifier = CONST.CHECKBUTTON_VISIBLE;
    }

    return (
        <div className={ CONST.HEADER_CLASSNAME }>
            <button
                className={ `${ CONST.CHECKBUTTON_BASE } ${ modifier }` }
                onClick={ checkAll }>&#9660;
            </button>
            <input
                className={ CONST.INPUT_CLASSNAME }
                placeholder={ CONST.PLACEHOLDER }
                value={ value }
                onChange={ controlInput }
            />
        </div>
    )
};

export default Header;