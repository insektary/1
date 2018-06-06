import React from 'react';
import { shallow, mount, render } from 'enzyme';
import CONST from '../Constants';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TodoItem from "./TodoItem";

configure({ adapter: new Adapter() });

describe('TodoItem testing', () => {

    test('item should be visible and active', () => {
        const todoItem = shallow(<TodoItem chosenFilter={ CONST.FILTER_DEFAULT } completed={ false }/>);

        expect(todoItem.find(`.${ CONST.ITEM_CLASSNAME }`)).toHaveLength(1);
        expect(todoItem.find(`.${ CONST.CHECKBUTTON_CLASSNAME }`)).toHaveLength(1);
        expect(todoItem.find(`.${ CONST.TITLE_CLASSNAME }`)).toHaveLength(1);
    });

    test('item should be visible and completed', () => {
        const todoItem = shallow(<TodoItem chosenFilter={ CONST.FILTER_DEFAULT } completed={ true }/>);

        expect(todoItem.find(`.${ CONST.ITEM_CLASSNAME }`)).toHaveLength(1);
        expect(todoItem.find(`.${ CONST.CHECKBUTTON_DONE }`)).toHaveLength(1);
        expect(todoItem.find(`.${ CONST.TITLE_DONE }`)).toHaveLength(1);
    });

    test('item should be completed and unvisible', () => {
        const todoItem = shallow(<TodoItem chosenFilter={ CONST.ACTIVE_ID } completed={ true }/>);

        expect(todoItem.find(`.${ CONST.ITEM_HIDDEN }`)).toHaveLength(1);
    });

    test('item should be active and unvisible', () => {
        const todoItem = shallow(<TodoItem chosenFilter={ CONST.COMPLETED_ID } completed={ false }/>);

        expect(todoItem.find(`.${ CONST.ITEM_HIDDEN }`)).toHaveLength(1);
    });

});