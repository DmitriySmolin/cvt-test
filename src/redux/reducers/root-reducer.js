import { combineReducers } from 'redux';
import authReducer from './auth-reducer';
import registerReducer from './register-reducer';
import charactersReducer from './characters-reducer';
import locationsReducer from './locations-reducer';
import episodesReducer from './episodes-reducer';

export default combineReducers({
  auth: authReducer,
  register: registerReducer,
  charactersList: charactersReducer,
  locationsList: locationsReducer,
  episodesList: episodesReducer,
});
