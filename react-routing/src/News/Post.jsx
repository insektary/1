import React from 'react';
import './News.less';
import { NavLink } from 'react-router-dom';
import { CSS } from '../CONST';

const Post = ({ date, title, content, id }) => (
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

export default Post;