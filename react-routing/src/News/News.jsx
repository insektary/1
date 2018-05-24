import React from 'react';
import './News.less';
import { NavLink } from 'react-router-dom';
import { CSS } from '../CONST';

const Post = ({ date, title, content, id }) => {
    return (
        <div className={ CSS.POST }>
            <div className={ CSS.POST_TITLE }>{ title }</div>
            <div className={ CSS.POST_CONTENT }>{ content }</div>
            <div className={ CSS.POST_FOOTER }>
                <div className={ CSS.POST_FOOTER_DATE }>{ date }</div>
                <NavLink  to={`/news/${ id }/edit`}>
                    <button className={ CSS.POST_FOOTER_EDIT }>Edit</button>
                </NavLink>
            </div>
        </div>
    )
};


const News = ({ children, data }) => {
    return (
        <div className={ CSS.NEWS }>
            <div className={ CSS.NEWS_TITLE }>
                <div className={ CSS.NEWS_TITLE_TITLE }>News</div>
                <NavLink  to="/news/add" activeClassName={ CSS.NEWS_TITLE_ADD_ACTIVE }>
                    <button className={ CSS.NEWS_TITLE_ADD }>Add new</button>
                </NavLink>
            </div>
                { children }
            <div className={ CSS.NEWS_CONTENT }>
                { data.map(({ title, date, content, key }) =>
                    <Post date={ date } title={ title } content={ content } key={ key } id={ key }/>)}
            </div>
        </div>
    )
};

export default News;