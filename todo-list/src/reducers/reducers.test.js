import React from 'react';
import faker from 'faker';

import chosenFilter from './chosenFilter';
import todoList from './todoList';
import CONST from '../Constants';

const { ACTIONS } = CONST;

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

    test('unknown action', () => {
        expect(chosenFilter('all', { type: undefined })).toBe('all');
    })

});

// const randomId = () => Math.round(Math.random() * 9);
//
// let testList = new Array(10).fill(0);
//
// testList = testList.map((todo) => ({
//     title: faker.name.title(),
//     id: faker.random.number().toString(),
//     completed: faker.random.boolean(),
//     lock: true
// }));
//
// const idMap = testList.map(({ id }) => id);
//
// describe('todoList reduce tests', () => {
//
//     test('add new todo', () => {
//         const newTodoTitle = faker.name.title();
//         const newTodoId = faker.random.number().toString();
//
//         expect(todoList(testList, { type: ACTIONS.ADD_TODO, title: newTodoTitle, id: newTodoId }))
//             .toEqual(expect.arrayContaining(testList));
//
//         expect(todoList(testList, { type: ACTIONS.ADD_TODO, title: newTodoTitle, id: newTodoId }))
//             .toContainEqual({ title: newTodoTitle, completed: false, lock: true, id: newTodoId });
//     });
//
//     test('change todo status', () => {
//         const randomIndex = randomId();
//         const currentStatus = testList[randomIndex].completed;
//
//         expect(todoList(testList, { type: ACTIONS.CHANGE_STATUS, id: idMap[randomIndex] }))
//             .toContainEqual({ title: testList[randomIndex].title, id: idMap[randomIndex], lock: true, completed: !currentStatus });
//     });
//
//     test('deleted all completed', () => {
//         expect(todoList(testArray, { type: ACTIONS.CLEAR_COMPLETED })).noCompleted();
//     });
//
//     test('unlock todo', () => {
//         const randomIndex = randomId();
//
//         expect(todoList(testList, { type: ACTIONS.UNLOCK_TODO, id: idMap[randomIndex] }))
//             .toContainEqual({ title: testList[randomIndex].title, id: idMap[randomIndex], lock: false, completed: testList[randomIndex].completed });
//     });
//
//     test('rewrite todo', () => {
//         const randomIndex = randomId();
//         const newTodoTitle = faker.name.title();
//
//         expect(todoList(testList, { type: ACTIONS.REWRITE_TODO, id: idMap[randomIndex], title: newTodoTitle }))
//             .toContainEqual({ title: newTodoTitle, id: idMap[randomIndex], lock: true, completed: testList[randomIndex].completed });
//     });
//
//     test('check all', () => {
//         expect(todoList(testArray, { type: ACTIONS.CHECK_ALL })).checkAll();
//     });
//
//     test('delete todo', () => {
//         const randomIndex = randomId();
//
//         expect(todoList(testList, { type: ACTIONS.DELETE_TODO, id: idMap[randomIndex] })).not.toContain(testList[randomIndex])
//     });
//
// });

describe('todoList reducer testing', () => {
    let testList = [];

    beforeEach(() => {
        testList = [
            {
                title: 'title1',
                id: '1',
                completed: false,
                lock: true
            },
            {
                title: 'title2',
                id: '2',
                completed: true,
                lock: true
            },
            {
                title: 'title3',
                id: '3',
                completed: true,
                lock: true
            }
        ];
    });

    test('addTodo', () => {
        expect(todoList(testList, { type: ACTIONS.ADD_TODO, title: 'title4', id: '4' }))
            .toEqual([
                {
                    title: 'title1',
                    id: '1',
                    completed: false,
                    lock: true
                },
                {
                    title: 'title2',
                    id: '2',
                    completed: true,
                    lock: true
                },
                {
                    title: 'title3',
                    id: '3',
                    completed: true,
                    lock: true
                },
                {
                    title: 'title4',
                    id: '4',
                    completed: false,
                    lock: true
                }
            ])
    });

    test('change todo status', () => {
        expect(todoList(testList, { type: ACTIONS.CHANGE_STATUS, id: '2' }))
            .toEqual([
                {
                    title: 'title1',
                    id: '1',
                    completed: false,
                    lock: true
                },
                {
                    title: 'title2',
                    id: '2',
                    completed: false,
                    lock: true
                },
                {
                    title: 'title3',
                    id: '3',
                    completed: true,
                    lock: true
                }
            ])
    });

    test('deleted all completed', () => {
        expect(todoList(testList, { type: ACTIONS.CLEAR_COMPLETED }))
            .toEqual([
                {
                    title: 'title1',
                    id: '1',
                    completed: false,
                    lock: true
                }
            ])
    });

    test('unlock todo', () => {
        expect(todoList(testList, { type: ACTIONS.UNLOCK_TODO, id: '2' }))
            .toEqual([
                {
                    title: 'title1',
                    id: '1',
                    completed: false,
                    lock: true
                },
                {
                    title: 'title2',
                    id: '2',
                    completed: true,
                    lock: false
                },
                {
                    title: 'title3',
                    id: '3',
                    completed: true,
                    lock: true
                }
            ])
    });

    test('rewrite todo', () => {
        expect(todoList(testList, { type: ACTIONS.REWRITE_TODO, id: '2', title: 'newTodoTitle' }))
            .toEqual([
                {
                    title: 'title1',
                    id: '1',
                    completed: false,
                    lock: true
                },
                {
                    title: 'newTodoTitle',
                    id: '2',
                    completed: true,
                    lock: true
                },
                {
                    title: 'title3',
                    id: '3',
                    completed: true,
                    lock: true
                }
            ]);
    });

    test('check all', () => {
        expect(todoList(testList, { type: ACTIONS.CHECK_ALL }))
            .toEqual([
                {
                    title: 'title1',
                    id: '1',
                    completed: true,
                    lock: true
                },
                {
                    title: 'title2',
                    id: '2',
                    completed: true,
                    lock: true
                },
                {
                    title: 'title3',
                    id: '3',
                    completed: true,
                    lock: true
                }
            ])
    });

    test('delete todo', () => {
        expect(todoList(testList, { type: ACTIONS.DELETE_TODO, id: '2' }))
            .toEqual([
                {
                    title: 'title1',
                    id: '1',
                    completed: false,
                    lock: true
                },
                {
                    title: 'title3',
                    id: '3',
                    completed: true,
                    lock: true
                }
            ])
    });

    test('unknown action', () => {
        expect(todoList(testList, { type: undefined }))
            .toEqual(testList);
    })

});
