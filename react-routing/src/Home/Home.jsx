import React from 'react';
import './Home.less';
import { CSS } from '../CONST';

const Home = () => {
    return (
        <div className={ CSS.HOME }>
            <div className={ CSS.HOME_TITLE }>
                Welcome!
            </div>
            <div className={ CSS.HOME_CONTENT }>

            </div>
        </div>
    )
};

export default Home;