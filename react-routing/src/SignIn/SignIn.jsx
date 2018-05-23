import React, { Component } from 'react';
import { withRouter } from 'react-router';
import './SignIn.less';

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

        if (login === 'login' && password === 'password') {
            window.localStorage.setItem('login', login);
            window.localStorage.setItem('password', password);

            this.props.signIn();
            this.props.history.push('/admin');
        } else {
            this.setState({ wrong: true });
        }

        event.preventDefault();
    }

    render() {
        const { wrong } = this.state;

        return (
            <form className="sign-form" onSubmit={ this.checkUser }>
                <div className={ wrong ? "alert-message--visible" : "alert-message--hidden" }>Login or password are incorrect</div>
                <input className={`sign-form__login ${ wrong ? "sign-form__login--wrong" : "sign-form__login--base" }`} name="login" required placeholder="Login"/>
                <input className={`sign-form__password ${ wrong ? "sign-form__password--wrong" : "sign-form__password--base" }`} name="password" required type="password" placeholder="Password"/>
                <button className="sign-form__submit" type="submit">Sign in!</button>
            </form>
        )
    }
}





export default withRouter(SignIn);