import React, { Component } from 'react';
import { withRouter } from 'react-router';
import './Admin.less';

class Admin extends Component {

    checkUser() {
        const login = window.localStorage.getItem('login');
        const password = window.localStorage.getItem('password');

        if (login !== 'login' || password !== 'password') {
            this.props.history.push('/signin');
        }
    }

    componentWillMount() {
        this.checkUser();
    }

    render() {
        return (
            <div className="admin">
                <div className="admin__title">
                    Admin's settings
                </div>
                <div className="admin__content">

                </div>
            </div>
        )
    }
}

export default withRouter(Admin);