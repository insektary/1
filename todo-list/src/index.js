import React from 'react';
import ReactDOM from 'react-dom';
import TodoList from './TodoList';
// import registerServiceWorker from './registerServiceWorker';

const appRender = () => {
    ReactDOM.render(<TodoList />, document.getElementById('root'));
};

appRender();