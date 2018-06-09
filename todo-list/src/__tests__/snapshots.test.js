import React from 'react';
import renderer from 'react-test-renderer';

import { TodoList } from '../TodoList';
import Header from '../Header/Header';
import TodoItem from '../TodoItem/TodoItem';
import Footer from '../Footer/Footer';
import FilterButton from '../Footer/FilterButton';

test('FilterButton rendering', () => {
    const tree = renderer
        .create(<FilterButton id="all" content={ 'All' }/>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});

test('Footer rendering', () => {
    const tree = renderer
        .create(<Footer chosenFilter="all" todoList={ [] } />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});

test('Header rendering', () => {
    const tree = renderer
        .create(<Header todoList={ [] } />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});

test('TodoItem rendering', () => {
    const tree = renderer
        .create(<TodoItem chosenFilter="all" completed={ false } lock={ true } id="1" title="test" />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});

test('TodoList rendering', () => {
    const tree = renderer
        .create(<TodoList todoList={ [] } chosenFilter="all" actions={ {} } />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});

