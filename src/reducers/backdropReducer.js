import { SET_BACKDROP } from '../actions/types';
import { backdrops } from '../services/backdrops';

const initialState = backdrops[Math.floor(Math.random() * 20)];

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_BACKDROP:
      return action.url;
    default:
      return state;
  }
};
