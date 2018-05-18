import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.less';

const Navigation = () => {
    return (
        <div className="nav">
            <ul className="menu">
                <li>
                    <Link className="menu-item__link" to="/contacts">
                        <div className="menu-item">CONTACTS</div>
                    </Link>
                </li>
                <li>
                    <Link className="menu-item__link" to="/about">
                        <div className="menu-item">ABOUT</div>
                    </Link>
                </li>
                <li>
                    <Link className="menu-item__link" to="/news">
                        <div className="menu-item">NEWS</div>
                    </Link>
                </li>
                <li>
                    <Link className="menu-item__link" to="/signin">
                        <div className="menu-item">SIGN IN</div>
                    </Link>
                </li>
            </ul>
        </div>
    )
};

export default Navigation;