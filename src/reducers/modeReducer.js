import { SET_MODE } from '../actions/types';

const initialState = 'input';

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_MODE:
      return action.mode;
    default:
      return state;
  }
};
