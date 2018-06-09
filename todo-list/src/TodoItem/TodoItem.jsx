import React from 'react';
import './todoItem.less';
import { CSS, ID, EVENTS } from '../Constants';

const TodoItem = ({ chosenFilter, completed, lock, id, title, changeStatus, deleteTodo, unlockTodo, rewriteTodo }) => {
    const visibility = ((chosenFilter === ID.ALL)
        || (chosenFilter === ID.ACTIVE && !completed)
        || (chosenFilter === ID.COMPLETED && completed));

    return (
        <div id={ id } key={ id } className={ visibility ? CSS.ITEM : CSS.ITEM_HIDDEN }><button
            className={ `${ CSS.CHECKBUTTON } ${ completed ? CSS.CHECKBUTTON_DONE : '' }` }
            onClick={ (event) => changeStatus(event) }>&#10004;</button>
                <input
                    defaultValue={ title }
                    readOnly={ lock ? CSS.READONLY_ATTR : '' }
                    className={ completed ? CSS.TITLE_DONE : CSS.TITLE }
                    onDoubleClick={ (event) => unlockTodo(event) }
                    onBlur={ (event) => rewriteTodo(event) }
                    onKeyPress={ (event) => {
                        if (event.key === EVENTS.ENTER && event.target.value.trim()) {
                            rewriteTodo(event);
                        }
                    }}
                />
                <button
                    className={ CSS.DELETE_BUTTON }
                    onClick={ (event) => deleteTodo(event) }>&#10006;
                </button>
            </div>
        )
};

export default TodoItem;