import { call, put, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import axios from 'axios';
import rater from './rater';
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

export function* fetchCandidates(seedMovie) {
  const candidates = [];

  const DISCOVER_URL = 'https://api.themoviedb.org/3/discover/movie';
  const API_KEY = '?api_key=8df45a2576b9f04343b3848be392d4ba';
  const COMMON_OPTS =
    '&language=en-US&sort_by=popularity.desc&include_adult=false' +
    '&include_video=false&page=1';
  const makeRequestUrl = query => {
    let requestUrl = `${DISCOVER_URL}${API_KEY}${COMMON_OPTS}${query}`;
    return requestUrl;
  };

  // movies by crew,
  try {
    let crewString = '&with_crew=';
    seedMovie.credits.crew.slice(0, 3).forEach(crewMember => {
      crewString += crewMember.id + '|';
    });
    crewString = crewString.substring(0, crewString.length - 1);

    const response = yield call(axios.get, makeRequestUrl(crewString));
    candidates.push(...response.data.results);
  } catch (error) {}

  // movies by cast,
  try {
    let castString = '&with_cast=';
    seedMovie.credits.cast.slice(0, 3).forEach(castMember => {
      castString += castMember.id + '|';
    });
    castString = castString.substring(0, castString.length - 1);

    const response = yield call(axios.get, makeRequestUrl(castString));
    candidates.push(...response.data.results);
  } catch (error) {}

  // movies by genre,
  try {
    let genreString = '&with_genres=';
    seedMovie.genres.forEach(genre => {
      genreString += genre.id + '|';
    });
    genreString = genreString.substring(0, genreString.length - 1);

    const response = yield call(axios.get, makeRequestUrl(genreString));
    candidates.push(...response.data.results);
  } catch (error) {}
  return candidates;
}

export function* fetchExtraDetails(candidates) {
  candidates = candidates.slice(0, 20);
  for (let i = 0; i < candidates.length; i++) {
    const enriched = yield fetchMovieDetails(candidates[i].id);
    candidates[i] = enriched;
  }
  return candidates;
}

export function* fetchMovieDetails(movieId) {
  const response = yield call(
    axios.get,
    `https://api.themoviedb.org/3/movie/${movieId}` +
      `?api_key=8df45a2576b9f04343b3848be392d4ba&append_to_response=credits`
  );
  return response.data;
}

export function* fetchRecommendations(action) {
  const movieId = action.movieId;

  // Optimistically update to 'generating' mode,
  yield put({ type: types.SET_MODE, mode: 'generating' });

  // First get deeper details of mans movie,
  const seedMovie = yield call(fetchMovieDetails, movieId);

  // Then discover some movies based on that,
  // Dummy for now, just returns movies of simlar cast,
  let candidates = yield call(fetchCandidates, seedMovie);
  console.log(candidates);
  candidates = yield call(fetchExtraDetails, candidates);

  // Then put them through the grindr,
  candidates = yield call(rater, seedMovie, candidates);

  // Then bake those movies to state,
  yield put({ type: types.SET_RECOMMENDATIONS, recommendations: candidates });

  // And change the mode to display,
  yield put({ type: types.SET_SELECTED_MOVIE, movie: candidates[0] });
  yield put({ type: types.SET_MODE, mode: 'display' });
}

export default function* rootSaga() {
  yield takeLatest('fetch_automovies', fetchAutoMovies);
  yield takeLatest(types.FETCH_RECOMMENDATIONS, fetchRecommendations);
}
