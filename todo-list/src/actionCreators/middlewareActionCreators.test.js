import middlewareActionCreators from './middlewareActionCreators';

const dispatch = jest.fn();

const middlewares = middlewareActionCreators(dispatch);

const fn = jest.fn()

describe('middlewares testing', () => {

    test('check all', () => {
        expect(middlewares.checkAll).toHaveBeenCalled();
    })

});