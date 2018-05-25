import React, { Component } from 'react';
import { withRouter } from 'react-router';
import './SignIn.less';
import { CONST, CSS } from '../CONST';

class SignIn extends Component {
    constructor(props) {
        super(props);

        this.checkUser = this.checkUser.bind(this);

        this.state = {
            wrong: false
        };
    }

    checkUser(event) {
        const [ {value: login}, {value: password} ] = event.target.elements;

        if (login === CONST.LOGIN && password === CONST.PASSWORD) {
            this.props.signIn();
            this.props.history.push('/admin');
        } else {
            this.setState({ wrong: true });
        }

        event.preventDefault();
    }

    render() {
        const { wrong } = this.state;
        const LOGIN_TEMPLATE = `${ CSS.SIGN_FORM_LOGIN } ${ wrong ? CSS.SIGN_FORM_LOGIN_WRONG : CSS.SIGN_FORM_LOGIN_BASE }`;

        return (
            <form className={ CSS.SIGN_FORM } onSubmit={ this.checkUser }>
                <div
                    className={ wrong ? CSS.ALERT_MESSAGE_VISIBLE : CSS.ALERT_MESSAGE_HIDDEN }>
                    Login or password are incorrect
                </div>
                <input
                    className={ LOGIN_TEMPLATE }
                    name={ CONST.LOGIN_LABEL }
                    required
                    placeholder={ CONST.LOGIN_PLACEHOLDER }
                />
                <input
                    className={LOGIN_TEMPLATE}
                    name={ CONST.PASSWORD_LABEL }
                    required
                    type={ CONST.PASSWORD_LABEL }
                    placeholder={ CONST.PASSWORD_PLACEHOLDER }
                />
                <button
                    className={ CSS.SIGN_FORM_SUBMIT }
                    type={ CONST.SUBMIT_TYPE }>Sign in!
                </button>
            </form>
        )
    }
}





export default withRouter(SignIn);