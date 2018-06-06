import React from 'react';
import { shallow, mount, render } from 'enzyme';
import CONST from '../Constants';

import FilterButton from './FilterButton';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Footer from "./Footer";

configure({ adapter: new Adapter() });

describe('FilterButton testing', () => {

    test('should render without throwing an error and with "selected" status', () => {
        const button = shallow(<FilterButton id={ CONST.ALL_ID } changeFilter={ undefined } content="All" chosenFilter={ CONST.ALL_ID } />);

        expect(button.contains('All')).toBe(true);
        expect(button.find(`.${ CONST.BUTTON_ACTIVE }`)).toHaveLength(1);
    });

    test('should render without throwing an error and with "non-selected" status', () => {
        const button = shallow(<FilterButton id={ CONST.ACTIVE_ID } changeFilter={ undefined } content="All" chosenFilter={ CONST.ALL_ID } />);

        expect(button.find(`.${ CONST.BUTTON_CLASSNAME }`)).toHaveLength(1);
    });

});

describe('Footer visibility testing', () => {

    test('should be unvisible', () => {
        const footer = shallow(<Footer todoList={ [] }/>);

        expect(footer.find(`.${ CONST.FOOTER_HIDDEN }`)).toHaveLength(1);
    });

    test('should be visible', () => {
        const footer = shallow(<Footer todoList={ [ {} ] }/>);

        expect(footer.find(`.${ CONST.FOOTER_HIDDEN }`)).toHaveLength(0);
    });

});

describe('Counter of completed testing', () => {
    test('should be 2 completed', () => {
        const footer = shallow(<Footer todoList={ [{completed: false}, {completed: false}, {completed: true}] }/>);

        expect(footer.contains(<div className={ CONST.COUNTER_CLASSNAME }>2 items left</div>)).toEqual(true);
    });
});