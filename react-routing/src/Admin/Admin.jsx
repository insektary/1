import React from 'react';
import { withRouter } from 'react-router';
import './Admin.less';
import { CSS } from '../CONST';

const Admin = ({ adminRights, history }) => {
    if (!adminRights) {
        history.push('/signin');
    }

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

export default withRouter(Admin);