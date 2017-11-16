import * as actions from './modeActions';
import * as types from './types';

describe('mode actions', () => {
  it('should create an action to change global mode', () => {
    const mode = 'display';
    const expectedAction = {
      type: types.SET_MODE,
      mode,
    };
    expect(actions.setMode(mode)).toEqual(expectedAction);
  });
});
