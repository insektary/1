import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import TodoItem from '../TodoItem/TodoItem';
import CONST from '../Constants';

import faker from 'faker';

let testList = new Array(10).fill(0);

testList = testList.map((todo) => ({
    title: faker.name.title(),
    id: faker.random.number().toString(),
    completed: faker.random.boolean(),
    lock: true
}));

// describe('creates snapshots', () => {
//
//     it('Header testing', () => {
//         const tree = renderer
//             .create(<Header todoList={ testList }/>)
//             .toJSON();
//         expect(tree).toMatchSnapshot();
//     });
//
//     it('Footer testing', () => {
//         const tree = renderer
//             .create(<Footer todoList={ testList } chosenFilter={ CONST.ACTIVE_ID }/>)
//             .toJSON();
//         expect(tree).toMatchSnapshot();
//     });
//
//     it('List testing', () => {
//         testList.forEach(({ title, id, completed, lock }) => {
//             const tree = renderer
//                 .create(<TodoItem chosenFilter={ CONST.ACTIVE_ID } completed={ completed }
//                                   title={ title } id={ id } lock={ lock }/>)
//                 .toJSON();
//             expect(tree).toMatchSnapshot();
//         })
//     });
//
// });

describe('render testing', () => {

    it('Header rendering', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Footer todoList={ testList }/>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('List rendering', () => {
        testList.forEach(({ title, id, completed, lock }) => {
            const div = document.createElement('div');

            ReactDOM.render(<TodoItem chosenFilter={ CONST.ACTIVE_ID } completed={ completed }
                                      title={ title } id={ id } lock={ lock }/>, div);

            ReactDOM.unmountComponentAtNode(div);
        });
    });

    it('Footer rendering', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Footer todoList={ testList } chosenFilter={ CONST.ACTIVE_ID }/>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

});
