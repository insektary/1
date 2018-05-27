import React from 'react';
import ReactDOM from 'react-dom';
import TodoList from './TodoList';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { combineReducers } from 'redux';
import todoList from './reducers/todoList';
import chosenFilter from './reducers/chosenFilter';

const store = createStore(combineReducers({ todoList, chosenFilter }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());


ReactDOM.render(
    <Provider store={ store }>
        <TodoList/>
    </Provider>, document.getElementById('root'));
