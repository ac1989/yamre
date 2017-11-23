import { all, call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import * as types from '../actions/types';
import { deDupe } from './helpers';

const API_KEY = '?api_key=8df45a2576b9f04343b3848be392d4ba';

export function* fetchAutoCompleteMovies(action) {
  const url =
    `https://api.themoviedb.org/3/search/movie${API_KEY}` +
    `&language=en-US&query=${action.searchString}&page=1&include_adult=false`;
  try {
    const response = yield call(axios.get, url);
    yield put({ type: types.SET_AUTOCOMPLETE, movies: response.data.results });
  } catch (error) {
    console.log(error);
  }
}

export function* fetchCandidates(seedMovie) {
  console.log(seedMovie);
  let candidates = [];
  let minRating = seedMovie.vote_average * 0.85;
  const DISCOVER_URL = 'https://api.themoviedb.org/3/discover/movie';
  const COMMON_OPTS =
    '&language=en-US&sort_by=popularity.desc&include_adult=false' +
    `&include_video=false&page=1&vote_average.gte=${minRating}&vote_count.gte=100`;

  function* makeRequest(query) {
    let requestUrl = `${DISCOVER_URL}${API_KEY}${COMMON_OPTS}${query}`;
    const response = yield call(axios.get, requestUrl);
    candidates.push(...response.data.results);
  }

  try {
    let queryString = '&with_crew=';
    const director = seedMovie.credits.crew.find(crewMember => {
      return crewMember.job === 'Director';
    });

    if (director) {
      queryString += director.id;
      yield makeRequest(queryString);
    }
  } catch (error) {
    console.log(error);
  }

  try {
    let queryString = '&with_crew=';
    const writers = seedMovie.credits.crew.filter(crewMember => {
      return crewMember.department === 'Writing';
    });

    if (writers.length > 0) {
      writers.forEach(writer => {
        queryString += writer.id + '|';
      });
      queryString = queryString.substring(0, queryString.length - 1);

      yield makeRequest(queryString);
    }
  } catch (error) {
    console.log(error);
  }

  const importantGenres = {
    Horror: 'Horror',
    Family: 'Family'
  };

  if (candidates.length < 20) {
    let importantGenreId = '';
    seedMovie.genres.forEach(genre => {
      let detected = importantGenres.hasOwnProperty(genre.name);
      if (detected) {
        importantGenreId += genre.id;
      }
    });

    if (importantGenreId.length > 0) {
      try {
        const queryString = `&with_genres=${importantGenreId}`;
        yield makeRequest(queryString);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log('No Important Genres');
    }
  }

  if (candidates.length > 20) {
    candidates = candidates.slice(0, 19);
  }

  console.log(candidates);
  candidates = deDupe(seedMovie, candidates);

  candidates = yield all(
    candidates.map(candidate => {
      return fetchMovieDetails(candidate.id);
    })
  );

  return candidates;
}

export function* fetchMovieDetails(movieId) {
  const response = yield call(
    axios.get,
    `https://api.themoviedb.org/3/movie/${movieId}` +
      `?api_key=8df45a2576b9f04343b3848be392d4ba&append_to_response=credits,keywords`
  );
  return response.data;
}

export function* fetchRecommendations(action) {
  const movieId = action.movieId;

  // Optimistically update to 'generating' mode,
  yield put({ type: types.SET_MODE, mode: 'generating' });

  // First get deeper details of mans movie,
  const seedMovie = yield call(fetchMovieDetails, movieId);
  yield put({ type: types.SET_BACKDROP, url: seedMovie.backdrop_path });

  // Then discover some movies based on that,
  let candidates = yield call(fetchCandidates, seedMovie);
  console.log(candidates);

  // Then bake those movies to state,
  yield put({ type: types.SET_RECOMMENDATIONS, recommendations: candidates });

  // And change the mode to display,
  yield put({ type: types.SET_MODE, mode: 'display' });
}

export default function* rootSaga() {
  yield takeLatest('fetch_automovies', fetchAutoCompleteMovies);
  yield takeLatest(types.FETCH_RECOMMENDATIONS, fetchRecommendations);
}
