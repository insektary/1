import React from 'react';
import './News.less';
import { NavLink } from 'react-router-dom';

const Post = ({date, title, image, content }) => {
    return (
        <div className="post">
            <div className="post__title">{ title }</div>
            <div className="post__content">{ content }</div>
            <div className="post__date">{ date }</div>
        </div>
    )
};

const News = ({ data }) => {
    return (
        <div className="news">
            <div className="news-title">
                <div className="news-title__title">News</div>
                <NavLink  to="/news/add">
                    <button className="news-title__add">Add</button>
                </NavLink>
            </div>


            <div className="news__content">
                { data.map(({ title, date, content, key }) =>
                    <Post date={ date } title={ title } content={ content } key={ key }/>
                )}
            </div>
        </div>
    )
};

export default News;