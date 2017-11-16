import { combineReducers } from 'redux';
import modeReducer from './modeReducer';
import autocompleteReducer from './autocompleteReducer';
import seedReducer from './seedReducer';
import recommendationsReducer from './recommendationsReducer';

export default combineReducers({
  mode: modeReducer,
  autocomplete: autocompleteReducer,
  seedMovie: seedReducer,
  reccomendations: recommendationsReducer
});
