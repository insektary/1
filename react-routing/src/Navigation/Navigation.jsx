import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.less';
import { CSS } from '../CONST';

// const links = [
//     {name: 'CONTACTS', url: '/contacts', admin: CSS.MENU_ITEM_LINK, user: CSS.MENU_ITEM_LINK},
//     {name: 'ABOUT', url: '/about', admin: CSS.MENU_ITEM_LINK, user: CSS.MENU_ITEM_LINK},
//     {name: 'NEWS', url: '/news', admin: CSS.MENU_ITEM_LINK, user: CSS.MENU_ITEM_LINK},
//     {name: 'ADMINISTRATION', url: '/admin', admin: CSS.MENU_ITEM_LINK, user: CSS.MENU_ITEM_LINK_HIDDEN},
//     {name: 'SIGN IN', url: '/signin', admin: CSS.MENU_ITEM_LINK_HIDDEN, user: CSS.MENU_ITEM_LINK},
//     {name: 'SIGN OUT', url: '#', admin: CSS.MENU_ITEM_LINK, user: CSS.MENU_ITEM_LINK_HIDDEN, handler: true}
// ];

const Navigation = ({ adminRights, signOut }) => (
    <div className={ CSS.NAV }>
        <ul className={ CSS.MENU }>
            {/*{ links.map(({ name, url, vis, admin, user, handler }, key) =>*/}
                {/*<li key={ key }>*/}
                    {/*<NavLink*/}
                        {/*className={ adminRights ? admin : user } onClick={ handler ? signOut : undefined }*/}
                        {/*activeClassName={ CSS.MENU_ITEM_LINK_ACTIVE } to={ url }>*/}
                        {/*<div className={ CSS.MENU_ITEM }>{ name }</div>*/}
                    {/*</NavLink>*/}
                {/*</li>) }*/}
            <li>
                <NavLink
                    className={ CSS.MENU_ITEM_LINK }
                    activeClassName={ CSS.MENU_ITEM_LINK_ACTIVE } to="/contacts">
                    <div className={ CSS.MENU_ITEM }>CONTACTS</div>
                </NavLink>
            </li>
            <li>
                <NavLink
                    className={ CSS.MENU_ITEM_LINK }
                    activeClassName={ CSS.MENU_ITEM_LINK_ACTIVE } to="/about">
                    <div className={ CSS.MENU_ITEM }>ABOUT</div>
                </NavLink>
            </li>
            <li>
                <NavLink
                    className={ CSS.MENU_ITEM_LINK }
                    activeClassName={ CSS.MENU_ITEM_LINK_ACTIVE } to="/news">
                    <div className={ CSS.MENU_ITEM }>NEWS</div>
                </NavLink>
            </li>
            <li>
                <NavLink
                    className={ adminRights ? CSS.MENU_ITEM_LINK : CSS.MENU_ITEM_LINK_HIDDEN}
                    activeClassName={ CSS.MENU_ITEM_LINK_ACTIVE } to="/admin">
                    <div className={ CSS.MENU_ITEM }>ADMINISTRATION</div>
                </NavLink>
            </li>
            <li>
                <NavLink
                    className={ adminRights ? CSS.MENU_ITEM_LINK_HIDDEN : CSS.MENU_ITEM_LINK }
                    activeClassName={ CSS.MENU_ITEM_LINK_ACTIVE } to="/signin">
                    <div className={ CSS.MENU_ITEM }>SIGN IN</div>
                </NavLink>
            </li>
            <li>
                <NavLink
                    className={ adminRights ? CSS.MENU_ITEM_LINK : CSS.MENU_ITEM_LINK_HIDDEN }
                    onClick={ signOut } to="/">
                    <div className={ CSS.MENU_ITEM }>SIGN OUT</div>
                </NavLink>
            </li>
        </ul>
    </div>
)

export default Navigation;