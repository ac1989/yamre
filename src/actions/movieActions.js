import * as types from './types';

export const setSelectedMovie = movie => {
  return { type: types.SET_SELECTED_MOVIE, movie };
};
