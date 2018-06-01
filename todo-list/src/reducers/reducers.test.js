import React from 'react';
import faker from 'faker';

import chosenFilter from './chosenFilter';
import todoList from './todoList';
import CONST from '../Constants';

const { ACTIONS } = CONST;

const randomId = () => Math.round(Math.random() * 9);

let testList = new Array(10).fill(0);

testList = testList.map((todo) => ({
    title: faker.name.title(),
    id: faker.random.number().toString(),
    completed: faker.random.boolean(),
    lock: true
}));

const idMap = testList.map(({ id }) => id);

const newTodo = {
    title: faker.name.title(),
    id: faker.random.number().toString(),
    completed: false,
    lock: true
};

describe('filter reduce tests', () => {

    test('filter changes to completed', () => {
        expect(chosenFilter('all', { type: ACTIONS.CHANGE_FILTER, filter: 'completed' })).toBe('completed');
    });

    test('filter changes to all', () => {
        expect(chosenFilter('all', { type: ACTIONS.CHANGE_FILTER, filter: 'all' })).toBe('all');
    });

    test('filter changes to active', () => {
        expect(chosenFilter('all', { type: ACTIONS.CHANGE_FILTER, filter: 'active' })).toBe('active');
    });

});

describe('todoList reduce tests', () => {

    test('add new todo', () => {
        const result = todoList(testList, { type: ACTIONS.ADD_TODO, title: newTodo.title });

        // expect(result).arrayContaining({ title: newTodo.title });

        // expect(todoList(testList, { type: ACTIONS.ADD_TODO, title: newTodo.title })).toContainEqual({ title: newTodo.title, completed: false, lock: true, id: /^\d+$/ });
    });
    //
    // test('change todo status', () => {
    //     expect(todoList(testArray, { type: ACTIONS.CHANGE_STATUS, id: testID})).statusWasChanged(testTodo);
    // });
    //
    // test('deleted all completed', () => {
    //     expect(todoList(testArray, { type: ACTIONS.CLEAR_COMPLETED })).noCompleted();
    // });
    //
    // test('unlock todo', () => {
    //     expect(todoList(testArray, { type: ACTIONS.UNLOCK_TODO, id: testID})).unlockTodo(testTodo);
    // });
    //
    // test('rewrite todo', () => {
    //     const randomIndex = randomId();
    //
    //     expect(todoList(testList, { type: ACTIONS.REWRITE_TODO, id: idMap[randomIndex], title: newTodo.title })).toContainEqual(newTodo);
    // });
    //
    // test('check all', () => {
    //     expect(todoList(testArray, { type: ACTIONS.CHECK_ALL })).checkAll();
    // });
    //
    test('delete todo', () => {
        const randomIndex = randomId();

        expect(todoList(testList, { type: ACTIONS.DELETE_TODO, id: idMap[randomIndex] })).not.toContain(testList[randomIndex])
    });

});
