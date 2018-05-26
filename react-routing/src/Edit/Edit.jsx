import React, { Component } from 'react';
import './Edit.less';
import { CONST, CSS } from '../CONST';
import { withRouter } from 'react-router';

class Edit extends Component {
    constructor({ addOrChange, cancelChanges, data, match: { params: { id }}}) {
        super();
        const { title, content } = this.findNews(data, id);

        this.changeNews = this.changeNews.bind(this);
        this.addOrChange = addOrChange;
        this.cancelChanges = cancelChanges;
        this.state = {
            title, content, id
        };
    }

    findNews(data, id) {
        const { title, content } = data.find((news) => news.key === Number(id)) || { title: CONST.WAIT, content: CONST.WAIT };

        return { title, content };
    }

    componentWillReceiveProps({ data, match: { params: { id }}}) {
        if (!data.find((news) => news.key === Number(id)) && data.length) {
            this.props.history.replace('/error204');
        }

        const { title, content } = this.findNews(data, id);

        this.setState({ title, content })
    }

    changeNews({ target: { type, value }}) {
        this.setState((prevState) => (type === CONST.TEXT_TYPE) ? { title: value } : { content: value });
    }

    render() {
        const { title, content, id } = this.state;

        return (
            <form className={ CSS.EDIT } onSubmit={ this.addOrChange } id={ id }>
                <div className={ CSS.EDIT_TITLE }>Edit news:</div>
                <input className={ CSS.EDIT_NEWTITLE } value={ title } onChange={ this.changeNews }/>
                <textarea className={ CSS.EDIT_NEWTEXT } value={ content } onChange={ this.changeNews }/>
                <div className={ CSS.EDIT_CONTROL }>
                    <button className={ CSS.EDIT_CONTROL_SUBMIT } type={ CONST.SUBMIT_TYPE }>Save</button>
                    <button className={ CSS.EDIT_CONTROL_CANCEL } onClick={ this.cancelChanges }>Cancel</button>
                </div>
            </form>
        )
    }
}

export default withRouter(Edit);