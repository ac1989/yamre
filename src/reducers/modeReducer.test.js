import reducer from './modeReducer';
import * as types from '../actions/types';

describe('Mode reducer,', () => {
  it('should return initial state (input)', () => {
    expect(reducer(undefined, {})).toEqual('input');
  });

  it('should handle SET_MODE', () => {
    expect(
      reducer(
        {},
        {
          type: types.SET_MODE,
          mode: 'display',
        },
      ),
    ).toEqual('display');

    expect(
      reducer(
        {},
        {
          type: types.SET_MODE,
          mode: 'generating',
        },
      ),
    ).toEqual('generating');
  });
});
