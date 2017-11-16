import { SET_RECOMMENDATIONS } from '../actions/types';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_RECOMMENDATIONS:
      return action.recommendations;
    default:
      return state;
  }
};
