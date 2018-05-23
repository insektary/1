import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.less';

const Navigation = ({ adminRights, signOut }) => {
    return (
        <div className="nav">
            <ul className="menu">
                <li>
                    <NavLink className="menu-item__link" activeClassName="menu-item__link--active" to="/contacts">
                        <div className="menu-item">CONTACTS</div>
                    </NavLink>
                </li>
                <li>
                    <NavLink className="menu-item__link" activeClassName="menu-item__link--active" to="/about">
                        <div className="menu-item">ABOUT</div>
                    </NavLink>
                </li>
                <li>
                    <NavLink className="menu-item__link" activeClassName="menu-item__link--active" to="/news">
                        <div className="menu-item">NEWS</div>
                    </NavLink>
                </li>
                <li>
                    <NavLink className={ adminRights ? "menu-item__link" : "menu-item__link--hidden"} activeClassName="menu-item__link--active" to="/admin">
                        <div className="menu-item">ADMINISTRATION</div>
                    </NavLink>
                </li>
                <li>
                    <NavLink className={ adminRights ? "menu-item__link--hidden" : "menu-item__link" } activeClassName="menu-item__link--active" to="/signin">
                        <div className="menu-item">SIGN IN</div>
                    </NavLink>
                </li>
                <li>
                    <NavLink className={ adminRights ? "menu-item__link" : "menu-item__link--hidden"} onClick={ signOut } to="/">
                        <div className="menu-item">SIGN OUT</div>
                    </NavLink>
                </li>
            </ul>
        </div>
    )
};

export default Navigation;