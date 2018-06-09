import React from 'react';
import { shallow, mount } from 'enzyme';
import { CSS, ID, EVENTS } from '../Constants';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TodoItem from "./TodoItem";

configure({ adapter: new Adapter() });

const setup = () => {
    const props = {
        changeStatus: jest.fn(),
        unlockTodo: jest.fn(),
        rewriteTodo: jest.fn(),
        deleteTodo: jest.fn()
    };

    const enzymeWrapper = mount(<TodoItem
        changeStatus={ props.changeStatus } unlockTodo={ props.unlockTodo }
        rewriteTodo={ props.rewriteTodo } deleteTodo={ props.deleteTodo }
        title="test"
    />);

    return {
        props,
        enzymeWrapper
    }
};

describe('TodoItem testing', () => {

    test('item should be visible and active', () => {
        const todoItem = shallow(<TodoItem chosenFilter={ ID.FILTER_DEFAULT } completed={ false }/>);

        expect(todoItem.find(`.${ CSS.ITEM }`)).toHaveLength(1);
        expect(todoItem.find(`.${ CSS.CHECKBUTTON }`)).toHaveLength(1);
        expect(todoItem.find(`.${ CSS.TITLE }`)).toHaveLength(1);
    });

    test('item should be visible and completed', () => {
        const todoItem = shallow(<TodoItem chosenFilter={ ID.FILTER_DEFAULT } completed={ true }/>);

        expect(todoItem.find(`.${ CSS.ITEM }`)).toHaveLength(1);
        expect(todoItem.find(`.${ CSS.CHECKBUTTON_DONE }`)).toHaveLength(1);
        expect(todoItem.find(`.${ CSS.TITLE_DONE }`)).toHaveLength(1);
    });

    test('item should be completed and unvisible', () => {
        const todoItem = shallow(<TodoItem chosenFilter={ ID.ACTIVE } completed={ true }/>);

        expect(todoItem.find(`.${ CSS.ITEM_HIDDEN }`)).toHaveLength(1);
    });

    test('item should be active and unvisible', () => {
        const todoItem = shallow(<TodoItem chosenFilter={ ID.COMPLETED } completed={ false }/>);

        expect(todoItem.find(`.${ CSS.ITEM_HIDDEN }`)).toHaveLength(1);
    });

});

describe('TodoItem event handlers testing', () => {
    const { enzymeWrapper, props } = setup();

    test('should be call changeStatus method', () => {
        const button = enzymeWrapper.find(`.${ CSS.CHECKBUTTON }`);

        button.props().onClick();
        expect(props.changeStatus.mock.calls.length).toBe(1)
    });

    test('should be call unlockTodo method', () => {
        const input = enzymeWrapper.find(`.${ CSS.TITLE }`);

        input.props().onDoubleClick();
        expect(props.unlockTodo.mock.calls.length).toBe(1)
    });

    test('should be call deleteTodo method', () => {
        const button = enzymeWrapper.find(`.${ CSS.DELETE_BUTTON }`);

        button.props().onClick();
        expect(props.deleteTodo.mock.calls.length).toBe(1)
    });

    test('should be call rewriteTodo method', () => {
        const button = enzymeWrapper.find(`.${ CSS.TITLE }`);

        button.props().onBlur({ target: { value: 'test' }});
        expect(props.rewriteTodo.mock.calls.length).toBe(1)
    });

    test('should be call rewriteTodo method', () => {
        const button = enzymeWrapper.find(`.${ CSS.TITLE }`);

        button.props().onKeyPress({ key: 'Enter', target: { value: 'test' }});
        expect(props.rewriteTodo.mock.calls.length).toBe(2)
    });

    test('shouldn`t be call rewriteTodo method', () => {
        const button = enzymeWrapper.find(`.${ CSS.TITLE }`);

        button.props().onKeyPress({ key: 'unknown', target: { value: 'test' }});
        expect(props.rewriteTodo.mock.calls.length).toBe(2)
    });

});