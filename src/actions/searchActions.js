import {
  FETCH_AUTOMOVIES,
  FETCH_RECOMMENDATIONS,
  RESET_AUTOCOMPLETE
} from './types';

export const fetchAutoMovies = searchString => {
  return { type: FETCH_AUTOMOVIES, searchString };
};

export const fetchRecommendations = movieId => {
  return { type: FETCH_RECOMMENDATIONS, movieId };
};

export const resetAutocomplete = () => {
  return { type: RESET_AUTOCOMPLETE };
};
