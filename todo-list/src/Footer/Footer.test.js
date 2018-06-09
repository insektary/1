import React from 'react';
import { mount, shallow } from 'enzyme'
import { CSS, ID } from '../Constants';

import FilterButton from './FilterButton';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Footer from "./Footer";

configure({ adapter: new Adapter() });

const setup = () => {
    const props = {
        changeFilter: jest.fn(),
        clearCompleted: jest.fn()
    };

    const enzymeWrapper = mount(<Footer clearCompleted={ props.clearCompleted } changeFilter={ props.changeFilter } todoList={ [{completed: false}, {completed: false}, {completed: true}] }/>);

    return {
        props,
        enzymeWrapper
    }
};

describe('FilterButton testing', () => {

    test('should render without throwing an error and with "selected" status', () => {
        const button = shallow(<FilterButton id={ ID.ALL } changeFilter={ undefined } content="All" chosenFilter={ ID.ALL } />);

        expect(button.contains('All')).toBe(true);
        expect(button.find(`.${ CSS.BUTTON_ACTIVE }`)).toHaveLength(1);
    });

    test('should render without throwing an error and with "non-selected" status', () => {
        const button = shallow(<FilterButton id={ ID.ACTIVE } changeFilter={ undefined } content="All" chosenFilter={ ID.ALL } />);

        expect(button.find(`.${ CSS.BUTTON }`)).toHaveLength(1);
    });

});

describe('Footer visibility testing', () => {

    test('should be unvisible', () => {
        const footer = shallow(<Footer todoList={ [] }/>);

        expect(footer.find(`.${ CSS.FOOTER_HIDDEN }`)).toHaveLength(1);
    });

    test('should be visible', () => {
        const footer = shallow(<Footer todoList={ [ {} ] }/>);

        expect(footer.find(`.${ CSS.FOOTER_HIDDEN }`)).toHaveLength(0);
    });

});

describe('Counter of completed testing', () => {
    test('should be 2 completed', () => {
        const footer = shallow(<Footer todoList={ [{completed: false}, {completed: false}, {completed: true}] }/>);

        expect(footer.contains(<div className={ CSS.COUNTER }>2 items left</div>)).toEqual(true);
    });
});

describe('Footer event handlers testing', () => {
    const { enzymeWrapper, props } = setup();

    test('should be call changeFilter method', () => {
        const button = enzymeWrapper.find('button#all');
        
        button.props().onClick();
        expect(props.changeFilter.mock.calls.length).toBe(1)
    });

    test('should be call changeFilter method', () => {
        const button = enzymeWrapper.find('button#active');
        
        button.props().onClick();
        expect(props.changeFilter.mock.calls.length).toBe(2)
    });

    test('should be call changeFilter method', () => {
        const button = enzymeWrapper.find('button#completed');

        button.props().onClick();
        expect(props.changeFilter.mock.calls.length).toBe(3)
    });

    test('should be call clearCompleted method', () => {
        const button = enzymeWrapper.find('button#clear');

        button.props().onClick();
        expect(props.clearCompleted.mock.calls.length).toBe(1)
    })
});
