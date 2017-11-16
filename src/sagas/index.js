import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import * as types from '../actions/types';

export function* fetchAutoMovies(action) {
  const key = '8df45a2576b9f04343b3848be392d4ba';
  const url =
    `https://api.themoviedb.org/3/search/movie?` +
    `api_key=${key}&language=en-US&query=${action.searchString}` +
    `&page=1&include_adult=false`;
  try {
    const response = yield call(axios.get, url);
    yield put({ type: types.SET_AUTOCOMPLETE, movies: response.data.results });
  } catch (error) {
    console.log(error);
  }
}

export function* fetchSeedMovie(movieId) {
  try {
    const response = yield call(
      axios.get,
      `https://api.themoviedb.org/3/movie/${movieId}` +
        `?api_key=8df45a2576b9f04343b3848be392d4ba&append_to_response=credits`
    );
    yield put({ type: types.SET_SEED_MOVIE, movie: response.data });
    return response.data;
  } catch (error) {}
}

export function* fetchCandidates(seedMovie) {
  try {
    const response = yield call(
      axios.get,
      `https://api.themoviedb.org/3/discover/movie` +
        `?api_key=8df45a2576b9f04343b3848be392d4ba` +
        `&with_cast=${seedMovie.credits.cast[0].id}` +
        `&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`
    );
    return response.data.results;
  } catch (error) {}
}

export function* fetchRecommendations(action) {
  const movieId = action.movieId;

  // Optimistically update to 'generating' mode,
  yield put({ type: types.SET_MODE, mode: 'generating' });

  // First get deeper details of mans movie,
  const seedMovie = yield call(fetchSeedMovie, movieId);
  console.log(seedMovie);

  // Then discover some movies based on that,
  // Dummy for now, just returns movies of simlar cast,
  const candidates = yield call(fetchCandidates, seedMovie);
  console.log(candidates);

  // Then put them through the grindr,
  // grindr returns an array

  // Then bake those movies to state,
  yield put({ type: types.SET_RECOMMENDATIONS, recommendations: candidates });

  // And change the mode to display,
  yield put({ type: types.SET_MODE, mode: 'display' });
}

export default function* rootSaga() {
  yield takeLatest('fetch_automovies', fetchAutoMovies);
  yield takeLatest(types.FETCH_RECOMMENDATIONS, fetchRecommendations);
}
