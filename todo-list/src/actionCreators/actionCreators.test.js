import faker from 'faker';
import actionCreators from './actionCreators';
import CONST from '../Constants';

const { ACTIONS } = CONST;

const randomTitle = faker.name.title();
const randomNumber = faker.random.number().toString();

describe('action creators testing', () => {

    test('checkAll creator', () => {
        expect(actionCreators.checkAll())
            .toEqual({ type: ACTIONS.CHECK_ALL });
    });

    test('changeFilter creator', () => {
        expect(actionCreators.changeFilter({ target: { id: randomNumber } }))
            .toEqual({ type: ACTIONS.CHANGE_FILTER,  filter: randomNumber });
    });

    test('clearCompleted creator', () => {
        expect(actionCreators.clearCompleted())
            .toEqual({ type: ACTIONS.CLEAR_COMPLETED });
    });

    test('deleteTodo creator', () => {
        expect(actionCreators.deleteTodo({ target: { parentNode: { id: randomNumber }}}))
            .toEqual({ type: ACTIONS.DELETE_TODO, id: randomNumber });
    });

    test('addTodo creator', () => {
        expect(actionCreators.addTodo({ key: CONST.ENTER, target: { value: randomTitle }}, randomNumber))
            .toEqual({ type: ACTIONS.ADD_TODO, title: randomTitle, id: randomNumber });
    });

    test('unlockTodo creator', () => {
        expect(actionCreators.unlockTodo({ target: { parentNode: { id: randomNumber }}})).toEqual({ type: ACTIONS.UNLOCK_TODO, id: randomNumber });
    });

    test('rewriteTodo creator', () => {
        expect(actionCreators.rewriteTodo({ key: CONST.ENTER, target: { value: randomTitle, parentNode: { id: randomNumber }}})).toEqual({ type: ACTIONS.REWRITE_TODO, id: randomNumber, title: randomTitle });
    });

    test('changeStatus creator', () => {
        expect(actionCreators.changeStatus({ target: { parentNode: { id: randomNumber }}})).toEqual({ type: ACTIONS.CHANGE_STATUS, id: randomNumber });
    });
});