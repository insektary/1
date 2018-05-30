import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.less';
import { CSS } from '../CONST';

const { MENU } = CSS;

const links = [
    { name: 'CONTACTS', url: '/contacts' },
    { name: 'ABOUT', url: '/about' },
    { name: 'NEWS', url: '/news' },
];

const Navigation = ({ adminRights, onSignOut }) => (
    <div className={ CSS.NAV }>
        <ul className={ MENU.CONTAINER }>
            { links.map(({ name, url, vis, admin, user, handler }, key) =>
                <li key={ key }>
                    <NavLink
                        className={ MENU.ITEM_LINK }
                        activeClassName={ MENU.ITEM_LINK_ACTIVE } to={ url }>
                        <div className={ MENU.ITEM }>{ name }</div>
                    </NavLink>
                </li>) }
            <li>
                <NavLink
                    className={ adminRights ? MENU.ITEM_LINK : MENU.ITEM_LINK_HIDDEN}
                    activeClassName={ MENU.ITEM_LINK_ACTIVE } to="/admin">
                    <div className={ MENU.ITEM }>ADMINISTRATION</div>
                </NavLink>
            </li>
            <li>
                <NavLink
                    className={ adminRights ? MENU.ITEM_LINK_HIDDEN : MENU.ITEM_LINK }
                    activeClassName={ MENU.ITEM_LINK_ACTIVE } to="/signin">
                    <div className={ MENU.ITEM }>SIGN IN</div>
                </NavLink>
            </li>
            <li>
                <NavLink
                    className={ adminRights ? MENU.ITEM_LINK : MENU.ITEM_LINK_HIDDEN }
                    onClick={ onSignOut } to="/">
                    <div className={ MENU.ITEM }>SIGN OUT</div>
                </NavLink>
            </li>
        </ul>
    </div>
);

export default Navigation;