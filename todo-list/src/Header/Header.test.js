import React from 'react';
import { shallow, mount } from 'enzyme';
import { CSS } from '../Constants';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Header from "./Header";

configure({ adapter: new Adapter() });

const setup = () => {
    const props = {
        checkAll: jest.fn(),
        addTodo: jest.fn()
    };

    const enzymeWrapper = mount(<Header checkAll={ props.checkAll } addTodo={ props.addTodo } todoList={ [{completed: false}, {completed: false}, {completed: true}] }/>);

    return {
        props,
        enzymeWrapper
    }
};

describe('Header testing', () => {

    test('checkButton should be unvisible', () => {
        const header = shallow(<Header todoList={ [] }/>);

        expect(header.find(`.${ CSS.ALL_CHECKBUTTON_HIDDEN }`)).toHaveLength(1);
    });

    test('checkButton should be visible and grey', () => {
        const header = shallow(<Header todoList={ [{ completed: false }] }/>);

        expect(header.find(`.${ CSS.ALL_CHECKBUTTON_VISIBLE }`)).toHaveLength(1);
    });

    test('checkButton should be visible and black', () => {
        const header = shallow(<Header todoList={ [{ completed: true }] }/>);

        expect(header.find(`.${ CSS.ALL_CHECKBUTTON_DONE }`)).toHaveLength(1);
    });

});

describe('Header event handlers testing', () => {
    const { enzymeWrapper, props } = setup();

    test('should be call checkAll method', () => {
        const button = enzymeWrapper.find(`.${ CSS.ALL_CHECKBUTTON_BASE }`);

        button.props().onClick();
        expect(props.checkAll.mock.calls.length).toBe(1)
    });

    test('should be call addTodo method', () => {
        const input = enzymeWrapper.find(`.${ CSS.INPUT }`);

        input.props().onKeyPress({ key: 'Enter', target: { value: 'test' }});
        expect(props.addTodo.mock.calls.length).toBe(1)
    });

    test('shouldn`t be call addTodo method', () => {
        const input = enzymeWrapper.find(`.${ CSS.INPUT }`);

        input.props().onKeyPress({ key: 'unknown', target: { value: 'test' }});
        expect(props.addTodo.mock.calls.length).toBe(1)
    });

});