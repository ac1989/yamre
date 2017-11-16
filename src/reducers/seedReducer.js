import { SET_SEED_MOVIE } from '../actions/types';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SEED_MOVIE:
      return action.movie;
    default:
      return state;
  }
};
