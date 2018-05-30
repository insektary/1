import React from 'react';
import './Edit.less';
import { CONST, CSS } from '../CONST';
import { withRouter } from 'react-router';

const { EDIT } = CSS;

const Edit_alt = ({ history, addOrChange, cancelChanges, news, match: { params: { id }}}) => {
    const editableNews = news.find((news) => news.id === id);

    const { title, content } = editableNews || { title: CONST.WAIT, content: CONST.WAIT };

    if (!editableNews && news.length) {
        history.replace('/error204');
    }

    return (
        <form className={ EDIT.CONTAINER } onSubmit={ addOrChange } id={ id }>
            <div className={ EDIT.TITLE }>Edit news:</div>
            <input className={ EDIT.NEWTITLE } name="title" ref={(input) => { if (input) { input.value = title }}} />
            <textarea className={ EDIT.NEWTEXT } name="content" ref={(input) => { if (input) { input.value = content }}} />
            <div className={ EDIT.CONTROL }>
                <button className={ EDIT.CONTROL_SUBMIT } type={ CONST.SUBMIT_TYPE }>Save</button>
                <button className={ EDIT.CONTROL_CANCEL } onClick={ cancelChanges }>Cancel</button>
            </div>
        </form>
    )
};

export default withRouter(Edit_alt);