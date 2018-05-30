import React from 'react';
import { withRouter } from 'react-router';
import './Admin.less';
import { CSS } from '../CONST';

const { ADMIN } = CSS;

const Admin = ({ adminRights, history }) => {
    if (!adminRights) {
        history.push('/signin');
    }

    return (
        <div className={ ADMIN.CONTAINER }>
            <div className={ ADMIN.TITLE }>
                Admin's settings
            </div>
            <div className={ ADMIN.CONTENT }>

            </div>
        </div>
    )
}

export default withRouter(Admin);