import { SET_SELECTED_MOVIE } from '../actions/types';

const initialState = 'input';

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_MOVIE:
      return action.movie;
    default:
      return state;
  }
};
