import React from 'react';
import './header.less';
import CONST from '../Constants';

const Header = ({ checkAll, everyIsCompleted, defaultValue, numberOfTodos }) => (
    <div className={ CONST.HEADER_CLASSNAME }>
        <button
            className={
                `${ everyIsCompleted ? CONST.ALL_CHECKBUTTON_DONE : CONST.CHECKBUTTON_VISIBLE }
                 ${ numberOfTodos ? '' : CONST.CHECKBUTTON_HIDDEN }`
            }
            onClick={ checkAll }>&#9660;
        </button>
        <input
            className={ CONST.INPUT_CLASSNAME }
            placeholder={ CONST.PLACEHOLDER }
        />
    </div>
);

export default Header;