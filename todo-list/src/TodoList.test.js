import React from 'react';
import { shallow, mount, render } from 'enzyme';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { TodoList } from './TodoList';

configure({ adapter: new Adapter() });

describe('TodoList testing', () => {
    test('should be a 4 children', () => {
        const todoList = shallow(<TodoList todoList={ [{ id: '1' }, { id: '2' }] }/>);

        expect(todoList.children()).toHaveLength(4)
    })
});