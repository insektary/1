import React from 'react';
import faker from 'faker';

import chosenFilter from './chosenFilter';
import todoList from './todoList';
import { ACTIONS } from '../Constants';

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

    test('unknown action and initial state', () => {
        expect(chosenFilter(undefined, { type: undefined })).toBe('all');
    })

});

describe('todoList reduce tests', () => {
    const LENGTH = 10;
    let testList = new Array(LENGTH).fill(0);

    const selectRandomPosition = () => Math.round(Math.random() * (LENGTH - 1));

    beforeEach(() => {
        testList = testList.map((todo) => ({
            title: faker.name.title(),
            id: faker.random.number().toString(),
            completed: faker.random.boolean(),
            lock: true
        }));
    });

    test('add new todo', () => {
        const title = faker.name.title();
        const id = faker.random.number().toString();
        const action = { type: ACTIONS.ADD_TODO, title, id };

        let newList = todoList(testList, action);
        let addedToDo = newList[10];

        expect(testList).not.toBe(newList);

        expect(newList.length).toBe(11);

        const checkedArray = [...testList, addedToDo];

        testList.forEach((todo, i) => {
            let checkedTODO = checkedArray[i];

            expect(todo).toEqual(checkedTODO);
        });

        expect(addedToDo).toEqual({ title, completed: false, lock: true, id });
    });

    test('change todo status', () => {
        const randomPosition = selectRandomPosition();
        const id = testList[randomPosition].id;
        const action = { type: ACTIONS.CHANGE_STATUS, id };

        const newList = todoList(testList, action);

        expect(testList).not.toBe(newList);

        expect(newList[randomPosition].completed).toBe(!testList[randomPosition].completed);
    });

    test('deleted all completed', () => {
        const newList = todoList(testList, { type: ACTIONS.CLEAR_COMPLETED });

        expect(newList.every(({ completed }) => !completed)).toBe(true);

        newList.forEach((todo) => expect(testList).toContainEqual(todo));
    });

    test('unlock todo', () => {
        const randomPosition = selectRandomPosition();
        const id = testList[randomPosition].id;
        const action = { type: ACTIONS.UNLOCK_TODO, id };

        const newList = todoList(testList, action);

        expect(testList).not.toBe(newList);

        expect(newList.length).toBe(10);

        expect(newList[randomPosition].lock).toBe(false);
    });

    test('rewrite todo', () => {
        const randomPosition = selectRandomPosition();
        const id = testList[randomPosition].id;
        const action = { type: ACTIONS.REWRITE_TODO, id, title: 'newTitle' };

        const newList = todoList(testList, action);

        expect(testList).not.toBe(newList);

        expect(newList.length).toBe(10);

        expect (newList[randomPosition].lock).toBe(true);
        expect (newList[randomPosition].title).toBe('newTitle');
    });

    test('check all', () => {
        const newList = todoList(testList, { type: ACTIONS.CHECK_ALL });

        expect(newList.length).toBe(10);

        expect(newList.every(({ completed }) => completed)).toBe(true);
    });

    test('delete todo', () => {
        const randomPosition = selectRandomPosition();
        const id = testList[randomPosition].id;

        const newList = todoList(testList, { type: ACTIONS.DELETE_TODO, id });

        expect(newList.length).toBe(9);

        newList.forEach((todo) => expect(testList).toContainEqual(todo));
    });

        test('unknown action and initial state', () => {
        expect(todoList(undefined, { type: undefined }))
            .toEqual([]);
    })

});
