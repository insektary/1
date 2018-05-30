import React from 'react';
import './todoItem.less';
import CONST from '../Constants';

const TodoItem = ({ chosenFilter, completed, deleteTodo, lock, id, title, unlockTodo, changeStatus, lockAndRewriteTodo }) => {
    const visibility = ((chosenFilter === CONST.ALL_ID)
        || (chosenFilter === CONST.ACTIVE_ID && !completed)
        || (chosenFilter === CONST.COMPLETED_ID && completed));

    return (
        <div id={ id } key={ id } className={ visibility ? CONST.ITEM_CLASSNAME : CONST.ITEM_HIDDEN }><button
            className={ `${ CONST.CHECKBUTTON_CLASSNAME } ${ completed ? CONST.CHECKBUTTON_DONE : '' }` }
            onClick={ changeStatus }>&#10004;</button>
                <input
                    defaultValue={ title }
                    readOnly={ lock ? CONST.READONLY_ATTR : '' }
                    className={ completed ? CONST.TITLE_DONE : CONST.TITLE_CLASSNAME }
                    onDoubleClick={ unlockTodo }
                    onBlur={ lockAndRewriteTodo }
                    onKeyPress={ lockAndRewriteTodo }
                />
                <button
                    className={ CONST.DELETE_BUTTON }
                    onClick={ deleteTodo }>&#10006;
                </button>
            </div>
        )
};

export default TodoItem;