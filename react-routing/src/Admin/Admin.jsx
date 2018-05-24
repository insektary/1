import React, { Component } from 'react';
import { withRouter } from 'react-router';
import './Admin.less';
import { CONST, CSS } from '../CONST';

class Admin extends Component {

    checkUser() {
        const login = window.localStorage.getItem(CONST.LOGIN);
        const password = window.localStorage.getItem(CONST.PASSWORD);

        if (login !== CONST.LOGIN || password !== CONST.PASSWORD) {
            this.props.history.push('/signin');
        }
    }

    componentWillMount() {
        this.checkUser();
    }

    render() {
        return (
            <div className={ CSS.ADMIN }>
                <div className={ CSS.ADMIN_TITLE }>
                    Admin's settings
                </div>
                <div className={ CSS.ADMIN_CONTENT }>

                </div>
            </div>
        )
    }
}

export default withRouter(Admin);