import React from 'react';
import './News.less';
import { NavLink } from 'react-router-dom';
import Post from './Post';
import { CSS } from '../CONST';

const News = ({ children, data }) => (
    <div className={ CSS.NEWS }>
        <div className={ CSS.NEWS_TITLE }>
            <div className={ CSS.NEWS_TITLE_TITLE }>News</div>
            <NavLink  to="/news/add" activeClassName={ CSS.NEWS_TITLE_ADD_ACTIVE }>
                <button className={ CSS.NEWS_TITLE_ADD }>Add new</button>
            </NavLink>
        </div>
        { children }
        <div className={ CSS.NEWS_CONTENT }>
            { data.map((post) => <Post { ...post } /> )}
        </div>
    </div>
)

export default News;