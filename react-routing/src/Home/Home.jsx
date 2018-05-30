import React from 'react';
import './Home.less';
import { CSS } from '../CONST';

const { HOME } = CSS;

const Home = () => (
    <div className={ HOME.CONTAINER }>
        <div className={ HOME.TITLE }>
            Welcome!
        </div>
        <div className={ HOME.CONTENT }>
        </div>
    </div>
);

export default Home;