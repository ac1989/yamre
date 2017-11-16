import { SET_AUTOCOMPLETE, RESET_AUTOCOMPLETE } from '../actions/types';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTOCOMPLETE:
      return [...action.movies];
    case RESET_AUTOCOMPLETE:
      return [];
    default:
      return state;
  }
};
