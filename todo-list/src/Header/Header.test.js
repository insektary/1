import React from 'react';
import { shallow, mount, render } from 'enzyme';
import CONST from '../Constants';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Header from "./Header";

configure({ adapter: new Adapter() });

describe('Header testing', () => {

    test('checkButton should be unvisible', () => {
        const header = shallow(<Header todoList={ [] }/>);

        expect(header.find(`.${ CONST.ALL_CHECKBUTTON_HIDDEN }`)).toHaveLength(1);
    });

    test('checkButton should be visible and grey', () => {
        const header = shallow(<Header todoList={ [{ completed: false }] }/>);

        expect(header.find(`.${ CONST.ALL_CHECKBUTTON_VISIBLE }`)).toHaveLength(1);
    });

    test('checkButton should be visible and black', () => {
        const header = shallow(<Header todoList={ [{ completed: true }] }/>);

        expect(header.find(`.${ CONST.ALL_CHECKBUTTON_DONE }`)).toHaveLength(1);
    });

});