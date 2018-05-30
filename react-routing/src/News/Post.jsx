import React from 'react';
import './News.less';
import { NavLink } from 'react-router-dom';
import { CSS } from '../CONST';

const { POST } = CSS;

const Post = ({ date, title, content, id }) => (
    <div className={ POST.CONTAINER }>
        <div className={ POST.TITLE }>{ title }</div>
        <div className={ POST.CONTENT }>{ content }</div>
        <div className={ POST.FOOTER }>
            <div className={ POST.FOOTER_DATE }>{ date }</div>
            <NavLink  to={`/news/${ id }/edit`}>
                <button className={ POST.FOOTER_EDIT }>Edit</button>
            </NavLink>
        </div>
    </div>
)

export default Post;