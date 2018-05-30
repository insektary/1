import React from 'react';
import './News.less';
import { NavLink } from 'react-router-dom';
import Post from './Post';
import { CSS } from '../CONST';

const { NEWS } = CSS;

const News = ({ children, data }) => (
    <div className={ NEWS.CONTAINER }>
        <div className={ NEWS.TITLE }>
            <div className={ NEWS.TITLE_TITLE }>News</div>
            <NavLink  to="/news/add" activeClassName={ NEWS.TITLE_ADD_ACTIVE }>
                <button className={ NEWS.TITLE_ADD }>Add new</button>
            </NavLink>
        </div>
        { children }
        <div className={ NEWS.CONTENT }>
            { data.map((post) => <Post { ...post } /> )}
        </div>
    </div>
)

export default News;