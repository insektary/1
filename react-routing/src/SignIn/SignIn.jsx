import React, { Component } from 'react';
import { withRouter } from 'react-router';
import './SignIn.less';
import { CONST, CSS } from '../CONST';

const { SIGN_FORM, ALERT_MESSAGE } = CSS;

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
            this.props.onSignIn();
            this.props.history.push('/admin');
        } else {
            this.setState({ wrong: true });
        }

        event.preventDefault();
    }

    render() {
        const { wrong } = this.state;
        const LOGIN_TEMPLATE = `${ SIGN_FORM.LOGIN } ${ wrong ? SIGN_FORM.LOGIN_WRONG : SIGN_FORM.LOGIN_BASE }`;

        return (
            <form className={ SIGN_FORM.CONTAINER } onSubmit={ this.checkUser }>
                <div
                    className={ wrong ? ALERT_MESSAGE.VISIBLE : ALERT_MESSAGE.HIDDEN }>
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
                    className={ SIGN_FORM.SUBMIT }
                    type={ CONST.SUBMIT_TYPE }>Sign in!
                </button>
            </form>
        )
    }
}





export default withRouter(SignIn);