import { combineReducers } from 'redux';
import modeReducer from './modeReducer';
import autocompleteReducer from './autocompleteReducer';
import seedReducer from './seedReducer';
import recommendationsReducer from './recommendationsReducer';
import selectedMovieReducer from './selectedMovieReducer';

export default combineReducers({
  mode: modeReducer,
  autocomplete: autocompleteReducer,
  seedMovie: seedReducer,
  recommendations: recommendationsReducer,
  selectedMovie: selectedMovieReducer
});
