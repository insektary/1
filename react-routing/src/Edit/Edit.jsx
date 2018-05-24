import React, { Component } from 'react';
import './Edit.less';
import { CONST, CSS } from '../CONST';
import { withRouter } from 'react-router';

class Edit extends Component {
    constructor({ submitChanges, cancelChanges, data, match: { params: { id }}}) {
        super();
        const { title, content } = Edit.findNews(data, id);

        this.changeNews = this.changeNews.bind(this);
        this.submitChanges = submitChanges;
        this.cancelChanges = cancelChanges;
        this.content = content;
        this.title = title;
        this.id = id;
    }

    static findNews(data, id) {
        const { title, content } = data.find((news) => news.key === Number(id)) || { title: CONST.WAIT, content: CONST.WAIT };

        return { title, content };
    }

    shouldComponentUpdate({ data, match: { params: { id }}}) {
        if (!data.find((news) => news.key === Number(id)) && data.length) {
            this.props.history.replace('/error204');
        }

        const { title, content } = Edit.findNews(data, id);

        this.content = content;
        this.title = title;

        return true;
    }

    changeNews({ target: { type, value }}) {
        if (type === CONST.TEXT_TYPE) {
            this.title = value;
        } else {
            this.content = value;
        }

        this.forceUpdate();
    }

    render() {
        const { title, content, id, submitChanges, cancelChanges, changeNews } = this;

        return (
            <form className={ CSS.EDIT } onSubmit={ submitChanges } id={ id }>
                <div className={ CSS.EDIT_TITLE }>Edit news:</div>
                <input className={ CSS.EDIT_NEWTITLE } value={ title } onChange={ changeNews }/>
                <textarea className={ CSS.EDIT_NEWTEXT } value={ content } onChange={ changeNews }/>
                <div className={ CSS.EDIT_CONTROL }>
                    <button className={ CSS.EDIT_CONTROL_SUBMIT } type={ CONST.SUBMIT_TYPE }>Save</button>
                    <button className={ CSS.EDIT_CONTROL_CANCEL } onClick={ cancelChanges }>Cancel</button>
                </div>
            </form>
        )
    }
}

export default withRouter(Edit);